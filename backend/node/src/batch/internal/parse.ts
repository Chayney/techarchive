const parseURL = (urlStr: string): URL => {
    return new URL(urlStr);
};

const getURLPath = (urlStr: string): string => {
    const u = parseURL(urlStr);
    return u.pathname;
};

export const internal = {
    getURLPath,
};