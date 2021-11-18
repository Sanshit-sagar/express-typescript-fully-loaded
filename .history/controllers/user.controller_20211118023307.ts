
import { NextFunction, Request, Response } from 'express'

import logger from '../lib/logger'
import { User } from '../models/user.model' 
import ExtendedError from '../errors/wrappers/ExtendedError';
import catchAsync from '../lib/catchAsync'

/**
 * @body firstName, lastName, password, email
 */
const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
        throw new ExtendedError(400, `Please provide an email, pw, fname and lname`)
    }

    const userCreated = await User.create({ firstName, lastName, email, password });
    res.status(201).json({ userCreated });  
}); 

/**
 * @query limit: number (> 0)  
 */
const getAllUsers = async (req: Request, res: Response) => {
    const { 
        limit = '5',
        sortDirection = 'asc',
        sortBy = 'createdAt'
    } = req.query;

    const userCount = parseInt(String(limit)); 
    const dir = dir==='desc' ? '-createdAt' : '+createdAt';

    const users = await User.find().limit(userCount).sort(comparator).exec(); 

    return res.status(200).json({ users });
};

/**
 * @params id
 */
const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findOne({ _id: id }); 
  
    if (!user) {
        return res.status(404).json({ 
            message: `User with id "${id}" not found.` 
        });
    }
    
    return res.status(200).json({ data: user });
};

/**
 * @params id
 */
const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    return res.status(200).json({ message: 'User deleted successfully.' });
};

/**
 * @params id
 * @body firstName, lastName
 */
const updateUser =  async (req: Request, res: Response) => {
    const { id } = req.params;
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