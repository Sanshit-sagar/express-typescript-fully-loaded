
// {"stringVa

class NotFoundError extends ExtendedError {
    value: string;
    path: string;
    reason: any;
    variableType: string; 

    constructor(
        stringValue: string = "Unknown", 
        kind: string = "Unknown", 
        value: string = "Unknown", 
        path: string = "", 
        reason: any = {}, 
        message: string = "Could not find the requested resource"
    ) {
        super(404, `Not Found Error ${message}`);
        this.value = value || stringValue;
        this.reason = reason;
        this.path = path;
        this.variableType = kind; 
    }
}