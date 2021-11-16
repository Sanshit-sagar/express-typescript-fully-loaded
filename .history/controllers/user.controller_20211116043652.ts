import crypto from 'crypto'
import { Request, Response } from 'express'
import { User, UserInput } from '../models/user.model' 

const hashPassword = (password: string) => {
    const salt = crypto.randomBytes(16).toString('hex');
    return crypto.pbkdf2Sync(password, salt, 100, 64, `sha512`).toString(`hex`);
}

const createUser =  async (req: Request, res: Response) => {
    const { email, password, firstName, lastName,role } = req.body;

    if (!email || !password || !firstName || !lastName || !role) {
        return res.status(422).json({ 
            message: 'The fields email, fullName, password and role are required' 
        });
    }

    const userInput: UserInput = {
        firstName,
        lastName,
        email,
        password: hashPassword(password),
        role
    };
    
    const userCreated = await User.create(userInput);
    return res.status(201).json({ data: userCreated });
};

const getAllUsers = async (_req: Request, res: Response) => {
    const users = await User.find().populate('role').sort('-createdAt').exec();

    return res.status(200).json({ data: users });
};

const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findOne({ _id: id }).populate('role').exec();
  
    if (!user) {
        return res.status(404).json({ 
            message: `User with id "${id}" not found.` 
        });
    }
    
    return res.status(200).json({ data: user });
};

const deleteUsers = async (req: Request, res: Response) => {
    const { id } = req.params;

    await User.findByIdAndDelete(id);
  
    return res.status(200).json({ message: 'User deleted successfully.' });
};

const updateUser =  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { enabled, fullName, role } = req.body;
  
    const user = await User.findOne({ _id: id });
  
    if (!user) {
      return res.status(404).json({ message: `User with id "${id}" not found.` });
    }
  
    if (!fullName || !role) {
      return res.status(422).json({ message: 'The fields fullName and role are required' });
    }
  
    await User.updateOne({ _id: id }, { enabled, fullName, role });
  
    const userUpdated = await User.findById(id);
  
    return res.status(200).json({ data: userUpdated });
};

export {
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById
};