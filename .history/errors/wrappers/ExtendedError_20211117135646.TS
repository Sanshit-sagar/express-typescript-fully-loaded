

class ExtendedError extends Error {
    code: number;
    
    constructor(props) {
        super(props);

    }


}

export default ExtendedError;