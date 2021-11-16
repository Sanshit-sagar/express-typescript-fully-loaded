import mongoose, { Schema, Model, Document } from 'mongoose';

export interface AuthToken {
    accessToken: string;
    kind: string;
}

type UserDocument = Document & {
    firstName: string;
    lastName: string; 
    email: string;
    password: string;
    passwordResetToken: string; 
    passwordTokenExpires: string; 
    role: string;
};

type UserInput = {
    firstName: UserDocument['fullName'];
    lastName: UserDocument['lastName'];
    email: UserDocument['email'];
    password: UserDocument['password'];
    enabled: UserDocument['enabled'];
    role: UserDocument['role'];
};

const usersSchema = new Schema({
    fullName: {
        type: Schema.Types.String,
        required: true,
    },
    lastName: {
        type: Schema.Types.String,
        required: true,
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    password: {
        type: Schema.Types.String,
        required: true,
    },
    enabled: {
        type: Schema.Types.Boolean,
        default: true,
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
        index: true,
    },
}, {
    collection: 'users',
    timestamps: true,
});

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', usersSchema);

export { 
    User,
    UserInput, 
    UserDocument
};