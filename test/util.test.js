import * as subject from '../src/util';

describe('Util', () => {
    test('withValue', () => {
        const e = { target: { value: 'dummy' } };
        const fn = subject.withValue(x => x);
        expect(fn(e)).toBe('dummy');
    });

    describe('parseDateString', () => {
        it('should return undefined for invalid input', () => {
            expect(subject.parseDateString('junk')).toBe(undefined);
        });

        it('should return ms since epoch for dates', () => {
            expect(subject.parseDateString('1996-12-31')).toBe(new Date(1996, 11, 31).getTime());
        });
    });

    describe('parseTimeString', () => {
        it('should return undefined for invalid input', () => {
            expect(subject.parseTimeString('junk')).toBe(undefined);
        });

        it('should return ms since epoch for times', () => {
            const now = new Date();
            expect(subject.parseTimeString('15:31')).toBe(
                (new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 31)).getTime(),
            );
        });
    });
});
