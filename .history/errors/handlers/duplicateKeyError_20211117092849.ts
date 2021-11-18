

export default ((error, req: Request, res: Response, next: NextFunction) => {
    const field = Object.keys(error.keyValue);
    const code = 409; 
  
    res.status(code).send({
        message: `A resource with that ${field} already exists`,
        fields: Object.keys(error.keyValue)
    })
})