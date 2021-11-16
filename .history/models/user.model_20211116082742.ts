import mongoose, { model, Schema, Model, Document } from 'mongoose';

interface IUser {
	firstName: string;
	lastName: string; 
	email: string;
	password: string;
};

// type UserDocument = Document & IUser;

type UserInput = {
    firstName: UserDocument['firstName'];
    lastName: UserDocument['lastName'];
    email: UserDocument['email'];
    password: UserDocument['password'];
};

const usersSchema = new Schema<IUser>({
    firstName: { type: Schema.Types.String, required: true },
    lastName: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true, unique: true },
    password: { type: Schema.Types.String, required: true }
}, { 
    collection: 'users', 
    timestamps: true,
    usePushEach: true
 });

const User: Model<UserDocument> = model<UserDocument>('User', usersSchema);

export { 
    User,
    UserInput, 
    UserDocument
};


// role: { type: Schema.Types.ObjectId, ref: 'Role', required: true, index: true },
// role: UserDocument['role'];