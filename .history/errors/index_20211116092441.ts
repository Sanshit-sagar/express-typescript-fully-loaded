type ClientErrorPrefix = `1`;
type 
type HttpErrorCode = ``

class ExtendedError extends Error {
    constructor(type, resource_id, content, code: HttpErrorCode) {
        super();
        this.name = this.constructor.name; 

        if(this instanceof ) {
            this.type = 'title'; 
        } else {
            this.type = 'body';
        }

        this.message = `The character count ${content?.length} of this ${this.type} (id: ${resource_id}) exceeds the limit.`
        this.statusCode = code; 
    }
}

export default CharacterCountExceeded