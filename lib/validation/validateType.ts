import {
    isAny,
    isFloat,
    isArray,
    isObject,
    isString,
    isNumber,
    isBoolean,
    isInteger
} from './typeValidators';

type ValidatableType = 'string' | 'integer' | 'boolean' | 'float' | 'number' | 'array' | 'object' | 'any'

export default (type: ValidatableType, value: unknown) => {
    switch(type) {
        case 'string':
            return isString(value);
        case 'integer':
            return isInteger(value);
        case 'float':
            return isFloat(value);
        case 'number':
            return isNumber(value);
        case 'boolean':
            return isBoolean(value);
        case 'array': 
            return isArray(value);
        case 'object':
            return isObject(value);
        default:
            return isAny(value);
    }
}