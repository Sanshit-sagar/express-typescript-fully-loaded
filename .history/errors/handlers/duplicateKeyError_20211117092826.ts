

export default ((error, req: Request, res: Response, next: NextFunction) => {
    const field = Object.keys(error.keyValue);
    const code = 409; 
    const message = `A resource with that ${field} already exists`;
    res.status(code).send({
        message,
        fields: 
    })
})