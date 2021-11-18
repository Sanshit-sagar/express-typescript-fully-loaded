
import { NextFunction, Request, Response } from 'express'

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
 * @query limit, sortDirection, sortBy
 */
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const { 
        limit = '5',
        sortDirection = 'asc',
        sortBy = 'createdAt'
    } = req.query;

    const count = parseInt(String(limit)); 

    if(!count || count===NaN) {
        throw new ExtendedError(400, 'Invalid limit, it must be a number > 0. Defaults to 10')
    }
    if(sortDirection !== 'asc' && sortDirection !== 'desc' && sortDirection !== '-' && sortDirection !== '+') {
        throw new ExtendedError(400, 'Invalid sort direction, must be asc/desc/-/+');
    } else {
        sortDirection = (sortDirection==='asc' )
    }
    if(sortBy !== 'email' && sortBy !== 'createdAt') {
        throw new ExtendedError(400, 'Invalid sortBy, must be email or createdAt');
    }

    const dir = sortDirection==='desc' ? '-' : '+';
    const by = (sortBy!=='email' && sortBy!=='createdAt') ? 'email' : sortBy
    const comparator = `${dir}${by}`;

    const users = await User.find().limit(count).sort(comparator).exec(); 

    return res.status(200).json({ users });
}); 

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