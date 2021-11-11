
export default (req: Request, res: Response, next: NextFunction) => {
    const allowedMethods = [
        "OPTIONS",
        "CONNECT",
        "HEAD",
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
    ]

    if(!allowedMethods.contains(req.method)) {
        
    }