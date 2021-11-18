import { Schema, model, Document, Model } from 'mongoose'

enum GenderEnum {
    MALE = 'male',
    FEMALE = 'female',
    NON_BINARY = 'nonBinary',
    UNDEFINED = 'undefined'
}; 

interface Poser {
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
    gender: { type: Schema.Types.String, enum: GenderEnum, default: GenderEnum.UNDEFINED },
    contact: { type: Schema.Types.ObjectId, ref: 'Contact', required: false, index: false },
}, { 
    collection: 'users', timestamps: true, usePushEach: true 
});

const PoserModel: Model<PoserDocument> = model('Poser', poserSchema);

export {
    Poser,
    PoserInput,
    PoserModel,
    PoserDocument,
    GenderEnum
};