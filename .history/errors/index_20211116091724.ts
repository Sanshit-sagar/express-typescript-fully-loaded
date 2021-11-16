class CharacterCountExceeded extends Error {
    constructor(resource_id, content) {
        super();
        this.name = this.constructor.name; 

        if(this instanceof LongTitleError) {
            this.type = 'title'; 
        } else {
            this.type = 'body';
        }

        this.message = 
    }
}