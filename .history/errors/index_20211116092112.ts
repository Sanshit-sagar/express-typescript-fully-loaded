export default class CharacterCountExceeded extends Error {
    constructor(resource_id, content) {
        super();
        this.name = this.constructor.name; 

        if(this instanceof LongTitleError) {
            this.type = 'title'; 
        } else {
            this.type = 'body';
        }

        this.message = `The character count ${content?.length} of this ${this.type} (id: ${resource_id}) exceeds the limit.`
        this.status = 422; 
    }
}

export default CharacterCountExceeded