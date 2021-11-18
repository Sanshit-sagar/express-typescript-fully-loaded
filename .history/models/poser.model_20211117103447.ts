import { Schema, model, Document, Model } from 'mongoose'
import { email, phone, url,} from '../lib/validator/index'

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
    phoneNumber: string;
}

type PoserDocument = Document & Poser;

type PoserInput = {
    firstName: PoserDocument['firstName'];
    lastName: PoserDocument['lastName'];
    email: PoserDocument['email'];
    avatar: PoserDocument['avatar'];
    userName: PoserDocument['userName'];
    gender: PoserDocument['gender'];
    phoneNumber: PoserDocument['phoneNumber'];
}

const poserSchema = new Schema<PoserDocument>({
    firstName: { 
        type: Schema.Types.String, 
        required: true,
        lowercase: true,
        validator: [validator()]
    },
    lastName: { 
        type: Schema.Types.String, 
        required: true 
    },
    email: { 
        type: Schema.Types.String, 
        required: true, 
        unique: true 
    },
    userName: { 
        type: Schema.Types.String, 
        required: true, 
        index: true, 
        unique: true 
    },
    gender: { 
        type: Schema.Types.String, 
        enum: GenderEnum, 
        default: GenderEnum.UNDEFINED, 
        required: true 
    },
    avatar: { 
        type: Schema.Types.String, 
        required: false 
    },
    phoneNumber: { 
        type: Schema.Types.String, 
        required: false
    },
}, { 
    collection: 'posers', timestamps: true, usePushEach: true 
});

const PoserModel: Model<PoserDocument> = model<PoserDocument>('Poser', poserSchema);

export {
    Poser,
    PoserInput,
    PoserModel,
    PoserDocument,
    GenderEnum
};