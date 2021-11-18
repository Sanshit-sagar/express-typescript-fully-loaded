
import { NextFunction, Request, Response } from 'express'

import { User } from '../models/user.model' 
import ExtendedError from '../errors/wrappers/ExtendedError';
import catchAsync from '../lib/catchAsync'

const requiredFields: string[] = [
    'email',
    'password',
    'firstName',
    'lastName'
];

const getMissingFields = (fields: { [key: string]: string; }): string => {
    return requiredFields
        .map((rf) => !fields[rf] ? rf : null)
        .filter((r) => r?.length >= 1)
        .join(', ')
        .trim();
}

/**
 * @body firstName, lastName, password, email
 */
const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
        throw new ExtendedError(
            400, 
            `Please provide the following fields: ${getMissingFields(req.body)}`, 
            'Unprocessable Entity'
        );
    }

    const userCreated = await User.create({ firstName, lastName, email, password });
    res.status(201).json({ userCreated });  
}); 

const isValidLimit = (limit: number) => {
    return !limit || limit===NaN;
}

const isValidSortDirection = (dir: string): boolean => {
    return  dir === 'asc' || dir === 'desc' ||  dir === '-' || dir === '+';
}

const isValidSortComparator = (comparator: string) => {
    return comparator !== 'email' && comparator !== 'createdAt';
};


/**
 * @query limit, sortDirection, sortBy
 */
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    let { 
        limit = '5',
        sortDirection = 'asc',
        sortBy = 'createdAt'
    } = req.query;

    let errorStr = '';
    if(!isValidLimit(parseInt(String(limit)))) errorStr += 'Invalid limit, it must be a number > 0. Defaults to 10';
    if(!isValidSortDirection(String(sortDirection))) errorStr += 'Invalid sort direction, must be asc/desc/-/+';
    if(isValidSortComparator(String(sortBy))) errorStr += 'Invalid sortBy, must be email or createdAt';

    if(errorStr.length) {
        throw new ExtendedError(400, errorStr); 
    }

    if(sortDirection.length > 1) sortDirection = sortDirection==='desc' ? '-' : '+';
    const users = await User
        .find()
        .sort(sanitizeComparator(String(sortBy), String(sortDirection))
        .limit(parseInt(String(limit)))
        .exec(); 

    return res.status(200).json({ users });
}); 

/**
 * @params id
 */
const getUserById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findOne({ _id: id }); 
  
    if (!user) {
        console.log('Throwing the no user found error'); 
        throw new ExtendedError(404, `Couldnt find a user with id: ${id}`);
    }
    
    return res.status(200).json({ user });
}); 

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