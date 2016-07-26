import R from 'ramda';
import Either from 'data.either';
import IntlMessageFormat from 'intl-messageformat';

const { Left, Right } = Either;

export const withValue = f => e => f(e.target.value);

const DATE_PATTERN = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
export const parseDateString = dateString => {
    const match = DATE_PATTERN.exec(dateString);

    if (match === null) { return undefined; }

    const [/* unused */, y, M, d] = match;
    return (new Date(
        parseInt(y, 10),
        parseInt(M, 10) - 1,
        parseInt(d, 10)
    )).getTime();
};

const TIME_PATTERN = /^(\d\d):(\d\d)$/;
export const parseTimeString = timeString => {
    const match = TIME_PATTERN.exec(timeString);

    if (match === null) { return undefined; }

    const [/* unused */, h, m] = match;
    const now = new Date();
    return (new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        parseInt(h, 10),
        parseInt(m, 10)
    )).getTime();
};

// parseFormats :: String -> Either String String
export const parseFormats = formats => {
    try {
        return new Right(JSON.parse(formats));
    } catch (err) {
        return new Left(`Formats: ${err.toString()}`);
    }
};

// compileMessage :: String -> String -> Object -> Object
export const compileMessage = R.curry((message, locale, formats) => {
    try {
        return new Right(new IntlMessageFormat(message, locale, formats));
    } catch (err) {
        return new Left(err.toString());
    }
});

// formatMessage :: Object -> Object -> String
export const formatMessage = R.curry((context, intl) => {
    try {
        return new Right(intl.format(context));
    } catch (err) {
        return new Left(err.toString());
    }
});
