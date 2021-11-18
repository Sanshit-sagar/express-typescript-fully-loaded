
import { NextFunction, Request, Response } from 'express'
import { NativeError } from 'mongoose';

import ValidationError from '../errors/wrappers/ValidationError'
import DuplicateKeyError  from '../errors/wrappers/DuplicateKeyError'
import { User, UserInput } from '../models/user.model' 
import logger from '../lib/logger'
import ExtendedError from 'errors/wrappers/ExtendedError';

function getEmptyFields(props: { email: string, password: string, firstName: string, lastName: string }) {
    return Object.entries(props).map((value: [string, string]) => {
        if(!value[1]?.length) {
            return {
                path: value[0],
                message: `${value[1]} is required`,
            }
        } else {
            return null; 
        }
    });
}

/**
 * @body email, password, firstName, lastName
 */
const createUser =  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        if (!email || !password || !firstName || !lastName) {
            return next(new ExtendedError(400, `Please provide an email, password, firstName and lastName`)); 
        }

        const userCreated = await User.create({ firstName, lastName, email, password });
        res.status(201).json({ userCreated });
    } catch (error) {
        next(error); 
    }   
};

/**
 * @query limit: number (> 0)  
 */
const getAllUsers = async (req: Request, res: Response) => {
    const { 
        limit = '5'
    } = req.query;

    const users = await User
        .find()
        .limit(parseInt(String(limit)))
        .sort('+email')
        .exec(); 

    return res.status(200).json({ data: users });
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