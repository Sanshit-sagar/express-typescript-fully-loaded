import { AsyncFunction } from "async";

type AsyncFunction 

export default (func: AsyncFunction) => {
    return (req, res, next) => {
        func(req, res, next);
    }
} 