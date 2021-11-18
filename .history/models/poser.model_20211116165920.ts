import { Schema, model, Document, Model } from 'mongoose'

export enum GenderEnum {
    MALE = 'male',
    FEMALE = 'female',
    NON_BINARY = 'nonBinary'
}; 

interface ContactDetails {
    phoneNumber: string;
    format: string; 
    linkedin?: string;
    facebook?: string;
    googleplus?: string;
    instagram?: string;
}

interface Poser {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string; 
    userName: string; 
    gender: GenderEnum; 
    contact: ContactDetails;
}

type PoserDocument = Document & Poser;

type PoserInput = {
    firstName: PoserDocument['firstName'],
    lastName: PoserDocument['lastName'],
    email: PoserDocument['email'],
    avatar: PoserDocument['avatar'],
    userName: PoserDocument['userName'],
    gender: PoserDocument['gender'],
    contact: PoserDocument['contact'],
}
type ContactInput = {
    phoneNumber: PoserDocument['phoneNumber'],
    format: PoserDocument['format'],
    linkedin?: PoserDocument['linkedin'],
    facebook? PoserDocument['facebook'],
    instagram?: PoserDocument['instagram'],
}

const poserSchema = new Schema<PoserDocument>({
    firstName: { type: Schema.Types.String, required: true },
    lastName: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true, unique: true },
    avatar: { type: Schema.Types.String, required: false },
    userName: { type: Schema.Types.String, required: true, index: true, unique: true },
    gender: { type: GenderEnum, required: false },
    contact: {
        new Schema({

        })
    }
}, { 
    collection: 'users', 
    timestamps: true,
    usePushEach: true
})


const PoserModel: Model<PoserDocument> = model<PoserDocument>('Poser', poserSchema);

export {
    Poser,
    PoserInput,
    PoserModel,
    PoserDocument
}