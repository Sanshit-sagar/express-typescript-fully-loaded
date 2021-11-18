import { AsyncFunction } from "async";

type AsyncFunction = (req, res, next) => Promise<void | any>

export default (func: AsyncFunction) => {
    return (req, res, next) => {
        func(req, res, next);
    }
} 