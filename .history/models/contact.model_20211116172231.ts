import { model, Document, Schema, Model } from 'mongoose'

interface Contact {
    phoneNumber: string;
    format: string; 
    linkedin?: string;
    facebook?: string;
    googleplus?: string;
    instagram?: string;
    userName: string;  
};

type ContactDocument = Document & Contact;

type ContactInput = {
    phoneNumber: ContactDocument['phoneNumber'],
    format: ContactDocument['format'],
    linkedin: ContactDocument['linkedin'],
    facebook: ContactDocument['facebook'],
    googleplus: ContactDocument['googleplus'],
    instagram: ContactDocument['instagram'],
    userName: ContactDocument['userName']
};

const contactSchema = new Schema<ContactDocument>({
    phoneNumber: { type: Schema.Types.String, required: true },
    format: { type: Schema.Types.String, required: true },
    linkedin: { type: Schema.Types.String, required: false },
    facebook: { type: Schema.Types.String, required: false },
    googleplus: { type: Schema.Types.String, required: false },
    instagram: { type: Schema.Types.String, required: false },
    username: { type: Schema.Types.ObjectId, required: true, index: true, unique: true }
});

const ContactModel: Model<ContactDocument> = model('Contact', contactSchema); 


export {
    Contact,
    ContactInput,
    ContactModel,
    ContactDocument
} 





