import { Request, Response } from 'express'
import { User, UserInput } from '../models/role.model' 
import crypto from 'crypto'

const hashPassword = (password: string) => {
    const salt = crypto.randomBytes(16).toString('hex');
    return crypto.pbkdf2Sync(password, salt, 100, 64, `sha512`).toString(`hex`);
}

const createUser =  async (req: Request, res: Response) => {
    const { email, enabled, fullName, password, role } = req.body;

    if (!email || !fullName || !password || !role) {
        return res.status(422).json({ 
            message: 'The fields email, fullName, password and role are required' 
        });
    }

    const userInput: UserInput = {
        fullName,
        email,
        password: hashPassword(password),
        enabled,
        role
    };

    const userCreated = await User.create(userInput);

    return res.status(201).json({ data: userCreated });
};

const getUserById =  async (req: Request, res: Response) => {

};

const getAllUsers =  async (req: Request, res: Response) => {

};

const deleteUsers = async (req: Request, res: Response) => {

};

const updateUser =  async (req: Request, res: Response) => {

};

export {
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById
};