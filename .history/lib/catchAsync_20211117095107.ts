

export default (func: (req, res, next) => Promise<void | any>) => {
    return (req, res, next) => {
        func(req, res, next);
    }
} 