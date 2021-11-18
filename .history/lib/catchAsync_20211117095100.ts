

export default (func: (req, res, next) => any |) => {
    return (req, res, next) => {
        func(req, res, next);
    }
} 