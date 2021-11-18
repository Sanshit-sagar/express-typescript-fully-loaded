import { model, Schema, Model, Document } from 'mongoose';
import { NextFunction } from 'express'; 
import validator from 'validator'; 
import bcrypt from 'bcrypt'; 

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
        required: [true, "The firstName field cannot be empty"],
        minLength: [1, "The firstName field must contain atleast 1 character"] 
    },
    lastName: { 
        type: Schema.Types.String, 
        required: [true, "The last name field cannot be empty"],
        minLength: [1, "The last name field must contain atleast 1 character"]
    },
    email: { 
        type: Schema.Types.String, 
        required: [true, "An email address is required to create a new User"],
        unique: [true, "That email address already exists"],
        validate: [validator.isEmail, "Please enter a valid email address"]
    },
    password: { 
        type: Schema.Types.String, 
        required: [true, "A password is required to create a new User"],
        minLength: [8,  "A valid password requires between 8 and 20 characters"],
        maxLength: [20, "A valid password requires between 8 and 20 characters"]
    }
}, { 
    collection: 'users', 
    timestamps: true,
    usePushEach: true
});

/** 
 * middleware run before userSchema  
 */
 usersSchema.pre("save", async function save(next: NextFunction): Promise<void> {
    const user = this as UserDocument;

    if(!user.isModified("password")) {
        return next(); 
    }
    
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User: Model<UserDocument> = model<UserDocument>('User', usersSchema);

export { 
    User,
    UserInput, 
    UserDocument
};