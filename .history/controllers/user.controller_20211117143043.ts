// import crypto from 'crypto'
import { NextFunction, Request, Response } from 'express'
import { User, UserInput } from '../models/user.model' 
import logger from '../lib/logger'
import { NativeError } from 'mongoose';
import ExtendedError from '../errors/wrappers/ExtendedError'

/**
 * @body email, password, firstName, lastName
 */
const createUser =  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
        let fields: string[] = getEmptyFields(email, password, firstName, lastName);

        next(new ExtendedError({
            message: 'The fields email, fullName and password are required' ,
            name: 'ValidationError',
            code: 422,
            type: 'CONFLICT',
        }));
    }

    // password should be hashed by middleware running pre-save
    const userInput: UserInput = {
        firstName,
        lastName,
        email,
        password
    };

    logger.info(`Attempting to create: ${JSON.stringify(userInput)}`);

    // TODO: 303 redirect instead? 
    const userCreated = await User.create(userInput, function(err: NativeError, userInput) {
        if(err) {
            next(new ExtendedError({
                message: err.message || 'The provided email is in conflict with an existing resource',
                name: err.name || 'DuplicateKeyError',
                stack: err.stack
            })); 
        } else {
            return res.status(201).json({ 
                data: userCreated 
            });
        }
    });
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