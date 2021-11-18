

export default (func: (req, res, next) => void) => {
    return (req, res, next) => {
        func(req, res, next);
    }
} 