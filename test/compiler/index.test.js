import { parse } from 'intl-messageformat-parser';
import { traverser } from '../../src/compiler';

describe('Compiler', () => {
    test('traverser', () => {
        const visitor = () => {
            const types = [];
            return {
                getTypes() { return types; },

                messageFormatPattern(node) {
                    expect(node.type).toBe('messageFormatPattern');
                    types.push(node.type);
                },
                messageTextElement(node) {
                    expect(node.type).toBe('messageTextElement');
                    types.push(node.type);
                },
                argumentElement(node) {
                    expect(node.type).toBe('argumentElement');
                    types.push(node.type);
                },
                simpleFormat(node) {
                    expect(node.type).toBe('simpleFormat');
                    types.push(node.type);
                },
                dateFormat(node) {
                    expect(node.type).toBe('dateFormat');
                    types.push(node.type);
                },
                timeFormat(node) {
                    expect(node.type).toBe('timeFormat');
                    types.push(node.type);
                },
                pluralFormat(node) {
                    expect(node.type).toBe('pluralFormat');
                    types.push(node.type);
                },
                selectOrdinalFormat(node) {
                    expect(node.type).toBe('selectOrdinalFormat');
                    types.push(node.type);
                },
                selectFormat(node) {
                    expect(node.type).toBe('selectFormat');
                    types.push(node.type);
                },
                optionalFormatPattern(node) {
                    expect(node.type).toBe('optionalFormatPattern');
                    types.push(node.type);
                },
                pluralStyle(node) {
                    expect(node.type).toBe('pluralStyle');
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

        expect(v.getTypes()).toEqual([
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
    });
});
