

export default (func: AsyncFunction) => {
    return (req, res, next) => {
        func(req, res, next);
    }
} 