import crypto from 'crypto'
import { Request, Response } from 'express'
import { User, UserInput } from '../models/user.model' 
import logger from '../lib/logger'

const hashPassword = (password: string) => {
    const salt = crypto.randomBytes(16).toString('hex');

    return crypto.pbkdf2Sync(password, salt, 100, 64, `sha512`).toString(`hex`);
}

/**
 * @body email, password, firstName, lastName
 */
const createUser =  async (req: Request, res: Response) => {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
        return res.status(422).json({ 
            message: 'The fields email, fullName and password are required' 
        });
    }

    const userInput: UserInput = {
        firstName,
        lastName,
        email,
        password: hashPassword(password)
    };
    
    const userCreated = await User.create(userInput);

    return res.status(201).json({ data: userCreated });
};

/**
 * 
 */
const getAllUsers = async (_req: Request, res: Response) => {
    logger.info(`inside GET /users`);

    const users = await User.find();

    return res.status(200).json({ data: users });
};

/**
 * @query id
 * 
 */
const getUserById = async (req: Request, res: Response) => {
    logger.info(`inside GET /users/:id`);

    const { id } = req.query;

    const user = await User.findOne({ _id: id }); 
  
    if (!user) {
        return res.status(404).json({ 
            message: `User with id "${id}" not found.` 
        });
    }
    
    return res.status(200).json({ data: user });
};

/**
 * @query id
 */
const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.query;

    await User.findByIdAndDelete(id);

    return res.status(200).json({ message: 'User deleted successfully.' });
};

/**
 * @query id
 * @body firstName, lastName
 */
const updateUser =  async (req: Request, res: Response) => {
    const { id } = req.query;
    const { firstName, lastName } = req.body;
  
    const user = await User.findOne({ _id: id });
  
    if (!user) {
      return res.status(404).json({ message: `User with id "${id}" not found.` });
    }
  
    if (!firstName || !lastName) {
        return res.status(422).json({ message: 'The fields firstName and lastName are required' });
    }
  
    await User.updateOne({ _id: id }, { firstName, lastName });

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