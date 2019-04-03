import dedent from 'dedent';
import * as IcuMessage from '../src/icu_message';

describe('ICU Message', () => {
    describe('tidy', () => {
        it('should preserve whitespace of raw text', () => {
            const cases = [
                '',
                'Raw    text    with    whitespace',
            ];
            cases.forEach(input => {
                expect(IcuMessage.tidy(input)).toBe(input);
            });
        });

        it('should add a single space inside ICU blocks', () => {
            const cases = [
                {
                    input: '{foo,number}',
                    expected: '{foo, number}',
                },
                {
                    input: '{foo,    date,    medium}',
                    expected: '{foo, date, medium}',
                },
                {
                    input: '{foo,time,   medium}',
                    expected: '{foo, time, medium}',
                },
            ];
            cases.forEach(({ input, expected }) => {
                expect(IcuMessage.tidy(input)).toBe(expected);
            });
        });

        it('should add linebreaks and indentation to complex ICU messages', () => {
            const cases = [
                {
                    input: '{foo, select, foo {Foo} bar {Bar} other {Baz}}',
                    expected: dedent`
                        {foo, select,
                            foo {Foo}
                            bar {Bar}
                            other {Baz}
                        }
                    `,
                },
                {
                    input: '{foo, plural, =0 {no foos} one {# foo} other {# foos}}',
                    expected: dedent`
                        {foo, plural,
                            =0 {no foos}
                            one {# foo}
                            other {# foos}
                        }
                    `,
                },
                {
                    input: '{foo, selectordinal, one {#st} two {#nd} few {#rd} other {#th}}',
                    expected: dedent`
                        {foo, selectordinal,
                            one {#st}
                            two {#nd}
                            few {#rd}
                            other {#th}
                        }
                    `,
                },
                {
                    input: dedent`
                        {numGuests, plural, offset:1
                          =0 {Jim does not give a party.}
                          =1 {Jim invites {guest} to his party.}
                          =2 {Jim invites {guest} and one other person to his party.}
                          other {Jim invites {guest} and # other people to his party.}}
                    `,
                    expected: dedent`
                        {numGuests, plural, offset:1
                            =0 {Jim does not give a party.}
                            =1 {Jim invites {guest} to his party.}
                            =2 {Jim invites {guest} and one other person to his party.}
                            other {Jim invites {guest} and # other people to his party.}
                        }
                    `,
                },
                {
                    input: dedent`
                        {gender_of_host, select,
                          female {
                           {num_guests, plural, offset:1
                              =0 {{host} does not give a party.}
                              =1 {{host} invites {guest} to her party.}
                              =2 {{host} invites {guest} and one other person to her party.}
                              other {{host} invites {guest} and # other people to her party.}}}
                          male {
                            {num_guests, plural, offset:1
                              =0 {{host} does not give a party.}
                              =1 {{host} invites {guest} to his party.}
                              =2 {{host} invites {guest} and one other person to his party.}
                              other {{host} invites {guest} and # other people to his party.}}}
                          other {
                            {num_guests, plural, offset:1
                              =0 {{host} does not give a party.}
                              =1 {{host} invites {guest} to their party.}
                              =2 {{host} invites {guest} and one other person to their party.}
                              other {{host} invites {guest} and # other people to their party.}}}}
                    `,
                    expected: dedent`
                        {gender_of_host, select,
                            female {{num_guests, plural, offset:1
                                =0 {{host} does not give a party.}
                                =1 {{host} invites {guest} to her party.}
                                =2 {{host} invites {guest} and one other person to her party.}
                                other {{host} invites {guest} and # other people to her party.}
                            }}
                            male {{num_guests, plural, offset:1
                                =0 {{host} does not give a party.}
                                =1 {{host} invites {guest} to his party.}
                                =2 {{host} invites {guest} and one other person to his party.}
                                other {{host} invites {guest} and # other people to his party.}
                            }}
                            other {{num_guests, plural, offset:1
                                =0 {{host} does not give a party.}
                                =1 {{host} invites {guest} to their party.}
                                =2 {{host} invites {guest} and one other person to their party.}
                                other {{host} invites {guest} and # other people to their party.}
                            }}
                        }
                    `,
                },
            ];
            cases.forEach(({ input, expected }) => {
                expect(IcuMessage.tidy(input)).toBe(expected);
            });
        });

        it('should be idempotent', () => {
            const cases = [
                '{foo,       number}',
                '{foo, date, medium}',
                '{foo, time, medium}',
                dedent`
                    {foo, select,
                        foo {Foo}
                        bar {Bar}
                        other {Baz}
                    }
                `,
                dedent`
                    {foo, plural,
                        =0 {no foos}
                        one {# foo}
                        other {# foos}
                    }
                `,
                dedent`
                    {foo, selectordinal,
                        one {#st}
                        two {#nd}
                        few {#rd}
                        other {#th}
                    }
                `,
            ];
            cases.forEach(input => {
                const once = IcuMessage.tidy(input);
                const twice = IcuMessage.tidy(once);
                expect(once).toBe(twice);
            });
        });

        it('should throw for invalid input', () => {
            const cases = [
                '{foo,'
            ];
            cases.forEach(input => {
                expect(IcuMessage.tidy.bind(null, input)).toThrow();
            });
        });
    });

    describe('uglify', () => {
        it('should preserve whitespace of raw text', () => {
            const cases = [
                '',
                'Raw    text    with    whitespace',
            ];
            cases.forEach(input => {
                expect(IcuMessage.uglify(input)).toBe(input);
            });
        });

        it('should strip extra whitespace inside ICU blocks', () => {
            const cases = [
                {
                    input: '{foo,       number}',
                    expected: '{foo, number}',
                },
                {
                    input: '{foo,    date,    medium}',
                    expected: '{foo, date, medium}',
                },
                {
                    input: '{foo,    time,   medium}',
                    expected: '{foo, time, medium}',
                },
            ];
            cases.forEach(({ input, expected }) => {
                expect(IcuMessage.uglify(input)).toBe(expected);
            });
        });

        it('should squash valid ICU message templates into a single line', () => {
            const cases = [
                {
                    input: dedent`
                        {foo, select,
                            foo {Foo}
                            bar {Bar}
                            other {Baz}
                        }
                    `,
                    expected: '{foo, select, foo {Foo} bar {Bar} other {Baz}}',
                },
                {
                    input: dedent`
                        {foo, plural,
                            =0 {no foos}
                            one {# foo}
                            other {# foos}
                        }
                    `,
                    expected: '{foo, plural, =0 {no foos} one {# foo} other {# foos}}',
                },
                {
                    input: dedent`
                        {foo, selectordinal,
                            one {#st}
                            two {#nd}
                            few {#rd}
                            other {#th}
                        }
                    `,
                    expected: '{foo, selectordinal, one {#st} two {#nd} few {#rd} other {#th}}',
                },
                {
                    input: dedent`
                        {numGuests, plural, offset:1
                          =0 {Jim does not give a party.}
                          =1 {Jim invites {guest} to his party.}
                          =2 {Jim invites {guest} and one other person to his party.}
                          other {Jim invites {guest} and # other people to his party.}}
                    `,
                    expected: '{numGuests, plural, offset:1 =0 {Jim does not give a party.} =1 {Jim invites {guest} to his party.} =2 {Jim invites {guest} and one other person to his party.} other {Jim invites {guest} and # other people to his party.}}',
                },
            ];
            cases.forEach(({ input, expected }) => {
                expect(IcuMessage.uglify(input)).toBe(expected);
            });
        });

        it('should be idempotent', () => {
            const cases = [
                '{foo,       number}',
                '{foo, date, medium}',
                '{foo, time, medium}',
                dedent`
                    {foo, select,
                        foo {Foo}
                        bar {Bar}
                        other {Baz}
                    }
                `,
                dedent`
                    {foo, plural,
                        =0 {no foos}
                        one {# foo}
                        other {# foos}
                    }
                `,
                dedent`
                    {foo, selectordinal,
                        one {#st}
                        two {#nd}
                        few {#rd}
                        other {#th}
                    }
                `,
            ];
            cases.forEach(input => {
                const once = IcuMessage.uglify(input);
                const twice = IcuMessage.uglify(once);
                expect(once).toBe(twice);
            });
        });

        it('should throw for invalid input', () => {
            const cases = [
                '{foo,'
            ];
            cases.forEach(input => {
                expect(IcuMessage.uglify.bind(null, input)).toThrow();
            });
        });
    });
});
