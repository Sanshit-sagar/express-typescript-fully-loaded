import { Schema, model, Document, Model } from 'mongoose'
import validator from 'validator'

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
        lowercase: true
    },
    lastName: { 
        type: Schema.Types.String, 
        required: true 
    },
    email: { 
        type: Schema.Types.String, 
        required: true,
        lowercase: true,
        unique: [
            true, 
            "That email address is already taken"
        ],
        validate:[
            validator.isEmail,
            "Please enter a valid email address"
        ]
    },
    userName: { 
        type: Schema.Types.String, 
        required: true, 
        index: true, 
        unique: true,
        minLength: [
            5,
            "The username must be at least 5 characters long"
        ]
    },
    gender: { 
        type: Schema.Types.String, 
        enum: GenderEnum, 
        default: GenderEnum.MALE, 
        required: true 
    },
    avatar: { 
        type: Schema.Types.String, 
        required: false 
    },
    phoneNumber: { 
        type: Schema.Types.String, 
        unique: [
            true,
            "That phone number is already taken"
        ],
        required: [
            true,
            "Please enter a valid phone number"
        ],
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