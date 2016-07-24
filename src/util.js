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
