import ExtendedError from './ExtendedError'

type DuplicateKeyValueItem =  {
    [key: string]: string
};

export type DuplicateKeyErrorProps = {
    keyValue: DuplicateKeyValueItem[]; 
};

class DuplicateKeyError extends ExtendedError {
    duplicates: DuplicateKeyValueItem[] | []; 
       
    constructor(props: DuplicateKeyErrorProps) {
        super(409, "Duplicate Key Error"); 
        this.duplicates = props?.duplicates || [];
    }
}

export default DuplicateKeyError;