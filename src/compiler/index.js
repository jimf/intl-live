/**
 * Traverser for Intl AST.
 *
 * @param {object} ast Intl AST (from intl-messageformat-parser)
 * @param {object} visitor Visitor object for traversal
 */
export const traverser = (ast, visitor) => {
    function traverse(node, parent) {
        /*jshint maxcomplexity:false*/
        if (Array.isArray(node)) {
            node.forEach(child => {
                traverse(child, parent);
            });
            return;
        }

        const method = visitor[node.type];

        if (method) {
            method(node, parent);
        }

        switch (node.type) {
            case 'messageFormatPattern':
                traverse(node.elements, node);
                break;

            // No children.
            case 'messageTextElement':
                break;

            case 'argumentElement':
                if (node.format) {
                    traverse(node.format, node);
                }
                break;

            // No children.
            case 'simpleFormat':
            case 'dateFormat':
            case 'timeFormat':
                break;

            case 'pluralFormat':
                traverse(node.options, node);
                break;

            case 'selectOrdinalFormat':
                traverse(node.options, node);
                break;

            case 'selectFormat':
                traverse(node.options, node);
                break;

            // No children.
            case 'optionalFormatPattern':
                break;

            case 'pluralStyle':
                traverse(node.options, node);
                break;

            default:
                throw new TypeError(node.type);
        }
    }

    traverse(ast, null);
};
