import { model, Document, Schema, Model } from 'mongoose'

interface Contact {
    phoneNumber: string;
    format: string; 
    linkedin?: string;
    facebook?: string;
    googleplus?: string;
    instagram?: string;
};

type ContactDocument = Document & Contact;

const contactSchema = new Schema<ContactDocument>({
    phoneNumber: { type: Schema.Types.String, required: true },
    format: { type: Schema.Types.String, required: true },
    linkedin: { type: Schema.Types.String, required: false },
    facebook: { type: Schema.Types.String, required: false },
    googleplus: { type: Schema.Types.String, required: false },
    instagram: { type: Schema.Types.String, required: false }
});


