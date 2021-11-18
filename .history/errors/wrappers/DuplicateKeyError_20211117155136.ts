

export type DuplicateKeyErrorProps = {
    keyValue: {
        [key: string]: string
    }; 
};

class DuplicateKeyError extends ExtendedError {
    keyValue: DuplicateKeyErrorProps;

    constructor(fieldMap: DuplicateKeyErrorProps) {
        super(409, "DuplicateKeyError", "Conflict"); 
        this.keyValue = {
            ...fieldMap
        }; 
    }
}