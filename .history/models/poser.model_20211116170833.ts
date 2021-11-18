import { Schema, model, Document, Model } from 'mongoose'

export enum GenderEnum {
    MALE = 'male',
    FEMALE = 'female',
    NON_BINARY = 'nonBinary'
}; 

interface IContact {
    phoneNumber: string;
    format: string; 
    linkedin?: string;
    facebook?: string;
    googleplus?: string;
    instagram?: string;
}

interface IPoser {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string; 
    userName: string; 
    gender: GenderEnum; 
    contact: IContact;
}

type PoserDocument = Document & IPoser;

type PoserInput = {
    firstName: PoserDocument['firstName'];
    lastName: PoserDocument['lastName'];
    email: PoserDocument['email'];
    avatar: PoserDocument['avatar'];
    userName: PoserDocument['userName'];
    gender: PoserDocument['gender'];
    contact: PoserDocument['contact'];
}

const poserSchema = new Schema<PoserDocument>({
    firstName: { type: Schema.Types.String, required: true },
    lastName: { type: Schema.Types.String, required: true },
    userName: { type: Schema.Types.String, required: true, index: true, unique: true },
    email: { type: Schema.Types.String, required: true, unique: true },
    avatar: { type: Schema.Types.String, required: false },
    gender: { type: GenderEnum, required: false, default: GenderEnum.MALE },
    contact: new Schema({
        phoneNumber: { type: Schema.Types.String, required: true },
        format: { type: Schema.Types.String, required: true },
        linkedin: { type: Schema.Types.String, required: false },
        facebook: { type: Schema.Types.String, required: false },
        googleplus: { type: Schema.Types.String, required: false },
        instagram: { type: Schema.Types.String, required: false }
})}, { 
    collection: 'users', timestamps: true, usePushEach: true 
});

const PoserModel: Model<PoserDocument> = model('Poser', poserSchema);

export {
    IPoser,
    IContact,
    PoserInput,
    PoserModel,
    PoserDocument,
}