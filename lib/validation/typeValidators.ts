
export const isBoolean = (value: any) => (
    value === true || value === false
);

export const isFloat = (value: any) => (
    Number(value) && value % 1 !== 0
);

export const isInteger = (value: any) => (
    Number(value) && value % 1 === 0
);

export const isNumber = (value: any) => (
    Number(value) === value
);

export const isString = (value: any) => (
    typeof value === "string"
);

export const isAny = (value: any) => (
    !!value
);

export const isArray = (value: any) => (
    !!Array.isArray(value)
);

export const isObject = (value: any) => (
    !!(value && typeof value === "object" && !Array.isArray(value))
);

