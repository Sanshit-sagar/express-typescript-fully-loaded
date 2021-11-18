import httpStatusCodes from ''./httpStatusCodes'

class ExtendedError extends Error {
    code: number;
    type: string;
    name: string;
    reason: string; 

    constructor(props) {
        super(props);

        this.code = 500;
    }


}

export default ExtendedError;