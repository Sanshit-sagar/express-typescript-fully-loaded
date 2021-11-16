import mongoose, { Schema, Model, Document } from 'mongoose';

type UserDocument = Document & ;

type UserInput = {
    firstName: UserDocument['firstName'];
    lastName: UserDocument['lastName'];
    email: UserDocument['email'];
    password: UserDocument['password'];
};

const usersSchema = new Schema({
    firstName: { type: Schema.Types.String, required: true },
    lastName: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true, unique: true },
    password: { type: Schema.Types.String, required: true }
}, { 
    collection: 'users', 
    timestamps: true,
    usePushEach: true
 });

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', usersSchema);

export { 
    User,
    UserInput, 
    UserDocument
};


// role: { type: Schema.Types.ObjectId, ref: 'Role', required: true, index: true },
// role: UserDocument['role'];