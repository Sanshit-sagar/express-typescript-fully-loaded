import { model, Schema, Model, Document } from 'mongoose';
import { NextFunction } from 'express'; 
import bcrypt from 'bcrypt'

interface IUser {
	firstName: string;
	lastName: string; 
	email: string;
	password: string;
}

type UserDocument = Document & IUser;

type UserInput = {
    firstName: UserDocument['firstName'];
    lastName: UserDocument['lastName'];
    email: UserDocument['email'];
    password: UserDocument['password'];
};

const usersSchema = new Schema<UserDocument>({
    firstName: { 
        type: Schema.Types.String, 
        required: true 
    },
    lastName: { 
        type: Schema.Types.String, 
        required: true
    },
    email: { 
        type: Schema.Types.String, 
        required: [true, 
        unique: true 
    },
    password: { 
        type: Schema.Types.String, 
        required: true 
    }
}, { 
    collection: 'users', 
    timestamps: true,
    usePushEach: true
});

usersSchema.pre('save', async function(next: NextFunction) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User: Model<UserDocument> = model<UserDocument>('User', usersSchema);

export { 
    User,
    UserInput, 
    UserDocument
};