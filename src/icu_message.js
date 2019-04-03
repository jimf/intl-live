import traverse from 'ast-traverse';
import { parse } from 'intl-messageformat-parser';

export const tidy = (template, options = {}) => {
    const indent = options.indent || 4;
    const parsed = parse(template);
    let level = 0;
    const stack = [];
    const spaces = () => ' '.repeat(indent * level);
    traverse(parse(template), {
        pre(node) {
            switch (node.type) {
                case 'pluralFormat':
                case 'selectFormat':
                    level += 1;
                    break;

                default:
                    /* do nothing */
            }
        },
        post(node) {
            switch (node.type) {
                case 'argumentElement': {
                    if (node.format) {
                        const top = stack.pop();
                        stack.push(`{${node.id}, ${top}${spaces()}}`);
                    } else {
                        stack.push(`{${node.id}}`);
                    }
                    break;
                }

                case 'dateFormat':
                case 'timeFormat':
                    stack.push(`${node.type.slice(0, node.type.indexOf('F'))}, ${node.style}`);
                    break;

                case 'messageFormatPattern': {
                    const elements = new Array(node.elements.length);
                    for (let i = node.elements.length - 1; i >= 0; i -= 1) {
                        elements[i] = stack.pop();
                    }
                    stack.push(`${elements.join('')}`);
                    break;
                }

                case 'messageTextElement':
                    stack.push(node.value);
                    break;

                case 'numberFormat':
                    stack.push('number');
                    break;

                case 'optionalFormatPattern': {
                    const top = stack.pop();
                    stack.push(`\n${spaces()}${node.selector} {${top}}`);
                    break;
                }

                case 'pluralFormat':
                case 'selectFormat': {
                    let format = node.type.slice(0, node.type.indexOf('F'));
                    if (node.type === 'pluralFormat' && node.ordinal) {
                        format = 'selectordinal';
                    }
                    format += ',';
                    if (node.offset) {
                        format += ` offset:${node.offset}`;
                    }
                    const options = new Array(node.options.length);
                    for (let i = node.options.length - 1; i >= 0; i -= 1) {
                        options[i] = stack.pop();
                    }
                    stack.push(`${format}${options.join('')}\n`);
                    level -= 1;
                    break;
                }

                default:
                    throw new Error(`Unhandled ast node in uglify: ${node.type}`)
            }
        }
    });
    return stack.pop();
};

/**
 * Remove extraneous newlines and whitespace from an ICU message template.
 *
 * Throws if unable to parse input.
 *
 * @param {string} template ICU message template
 * @return {string} Reformatted template
 */
export const uglify = (template) => {
    const parsed = parse(template);
    const stack = [];
    traverse(parse(template), {
        post(node) {
            switch (node.type) {
                case 'argumentElement': {
                    if (node.format) {
                        const top = stack.pop();
                        stack.push(`{${node.id}, ${top}}`);
                    } else {
                        stack.push(`{${node.id}}`);
                    }
                    break;
                }

                case 'dateFormat':
                case 'timeFormat':
                    stack.push(`${node.type.slice(0, node.type.indexOf('F'))}, ${node.style}`);
                    break;

                case 'messageFormatPattern': {
                    const elements = new Array(node.elements.length);
                    for (let i = node.elements.length - 1; i >= 0; i -= 1) {
                        elements[i] = stack.pop();
                    }
                    stack.push(`${elements.join('')}`);
                    break;
                }

                case 'messageTextElement':
                    stack.push(node.value);
                    break;

                case 'numberFormat':
                    stack.push('number');
                    break;

                case 'optionalFormatPattern': {
                    const top = stack.pop();
                    stack.push(`${node.selector} {${top}}`);
                    break;
                }

                case 'pluralFormat':
                case 'selectFormat': {
                    let format = node.type.slice(0, node.type.indexOf('F'));
                    if (node.type === 'pluralFormat' && node.ordinal) {
                        format = 'selectordinal';
                    }
                    format += ',';
                    if (node.offset) {
                        format += ` offset:${node.offset}`;
                    }
                    const options = new Array(node.options.length);
                    for (let i = node.options.length - 1; i >= 0; i -= 1) {
                        options[i] = stack.pop();
                    }
                    stack.push(`${format} ${options.join(' ')}`);
                    break;
                }

                default:
                    throw new Error(`Unhandled ast node in uglify: ${node.type}`)
            }
        }
    });
    return stack.pop();
};
