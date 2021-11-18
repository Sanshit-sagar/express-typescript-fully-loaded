

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


lue":"\"6193d55b5237fb60692a6\"","kind":"ObjectId","value":"6193d55b5237fb60692a6","path":"_id","reason":{},"message":"Cast to ObjectId failed for value \"6193d55b5237fb60692a6\" at path \"_id\" for model \"User\""}


// type NotFoundErrorProps = {
//     stringValue: string;
//     kind: "ObjectId" | "String" | "number" | "boolean" | "Array";
//     value: string;
//     path: "_id" | string;
//     reason: {

//     }; 
//     message: string; 
// }; 