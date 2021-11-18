

class ExtendedError extends Error {
    code: number;
    reason: string;
    type: string;
    

    constructor(props) {
        super(props);

    }


}

export default ExtendedError;