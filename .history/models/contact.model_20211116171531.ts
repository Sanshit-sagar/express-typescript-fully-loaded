
interface Contact {
    phoneNumber: string;
    format: string; 
    linkedin?: string;
    facebook?: string;
    googleplus?: string;
    instagram?: string;
}

const ContactDocument = Contact & Document;

const contactSchema = new Schema({
    phoneNumber: { type: Schema.Types.String, required: true },
    format: { type: Schema.Types.String, required: true },
    linkedin: { type: Schema.Types.String, required: false },
    facebook: { type: Schema.Types.String, required: false },
    googleplus: { type: Schema.Types.String, required: false },
    instagram: { type: Schema.Types.String, required: false }
});


