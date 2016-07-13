import test from 'tape';
import { parse } from 'intl-messageformat-parser';
import { traverser } from '../../src/compiler';

test('compiler.traverser', t => {
    t.plan(20);

    const visitor = () => {
        const types = [];
        return {
            getTypes() { return types; },

            messageFormatPattern(node) {
                t.equal(node.type, 'messageFormatPattern');
                types.push(node.type);
            },
            messageTextElement(node) {
                t.equal(node.type, 'messageTextElement');
                types.push(node.type);
            },
            argumentElement(node) {
                t.equal(node.type, 'argumentElement');
                types.push(node.type);
            },
            simpleFormat(node) {
                t.equal(node.type, 'simpleFormat');
                types.push(node.type);
            },
            dateFormat(node) {
                t.equal(node.type, 'dateFormat');
                types.push(node.type);
            },
            timeFormat(node) {
                t.equal(node.type, 'timeFormat');
                types.push(node.type);
            },
            pluralFormat(node) {
                t.equal(node.type, 'pluralFormat');
                types.push(node.type);
            },
            selectOrdinalFormat(node) {
                t.equal(node.type, 'selectOrdinalFormat');
                types.push(node.type);
            },
            selectFormat(node) {
                t.equal(node.type, 'selectFormat');
                types.push(node.type);
            },
            optionalFormatPattern(node) {
                t.equal(node.type, 'optionalFormatPattern');
                types.push(node.type);
            },
            pluralStyle(node) {
                t.equal(node.type, 'pluralStyle');
                types.push(node.type);
            }
        };
    };

    let v = visitor();
    traverser(parse(`
        On {takenDate, date, short} {name} took {numPhotos, plural,
            =0 {no photos.}
            =1 {one photo.}
            other {# photos.}
        }
    `), v);

    t.deepEqual(v.getTypes(), [
        'messageFormatPattern',
        'messageTextElement',
        'argumentElement',
        'dateFormat',
        'messageTextElement',
        'argumentElement',
        'messageTextElement',
        'argumentElement',
        'pluralFormat',
        'optionalFormatPattern',
        'messageFormatPattern',
        'messageTextElement',
        'optionalFormatPattern',
        'messageFormatPattern',
        'messageTextElement',
        'optionalFormatPattern',
        'messageFormatPattern',
        'messageTextElement',
        'messageTextElement'
    ]);

    t.end();
});
