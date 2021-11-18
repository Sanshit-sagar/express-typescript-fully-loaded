
{"stringValue":"\"6193d55b5237fb60692a6\"","kind":"ObjectId","value":"6193d55b5237fb60692a6","path":"_id","reason":{},"message":"Cast to ObjectId failed for value \"6193d55b5237fb60692a6\" at path \"_id\" for model \"User\""}


type NotFoundErrorProps = {
    stringValue: string;
    kind: "ObjectId" | "String" | "number" | "boolean" | "Array";
    value: string;
    path: "_id" | string;
    reason: {

    }; 
    message: string; 
}; 

class NotFoundError extends ExtendedError {

    constructor(
        stringValue: string, 
        kind: string, 
        value: string, 
        path: string, reason: string = {}, message: string)
}