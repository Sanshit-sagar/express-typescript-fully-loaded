

class ExtendedError extends Error {
    code: number;
    message: string;
    type: string;
    

    constructor(props) {
        super(props);

    }


}

export default ExtendedError;