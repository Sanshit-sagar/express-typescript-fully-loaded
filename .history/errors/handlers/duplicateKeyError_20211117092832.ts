

export default ((error, req: Request, res: Response, next: NextFunction) => {
    const field = Object.keys(error.keyValue);
    const code = 409; 
    const message =
    res.status(code).send({
        message,
        fields: 
    })
})