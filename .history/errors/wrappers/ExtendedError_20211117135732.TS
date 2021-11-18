

class ExtendedError extends Error {
    code: number;
    type: string;
    name: string; 

    constructor(props) {
        super(props);

    }


}

export default ExtendedError;