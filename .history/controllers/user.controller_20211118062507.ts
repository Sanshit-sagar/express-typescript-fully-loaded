
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

type Limit = number | typeof NaN;
type InputDirection = '+' | '-' | 'desc' | 'asc';
type Direction = Extract<InputDirection, "+" | "-">;
type SortableField =  'email' | 'createdAt';
type Comparator = `${Direction}${SortableField}`;


const isValidLimit = (limit: any) => limit && limit!==NaN && typeof limit === 'number' && limit > 1; 
const isValidSortDirection = (dir: string): boolean => dir === 'asc' || dir === 'desc' ||  dir === '-' || dir === '+';
const isValidSortComparator = (comparator: string) => comparator !== 'email' && comparator !== 'createdAt';

const sanitizeComparator = (dir: InputDirection | string, comp: SortableField | string): Comparator => {
    const c: SortableField = comp==='email' 
        ? 'email' 
        : 'createdAt';

    const d: Direction = dir.length > 1 
        ? dir==='desc'  ? '-' : '+'
        : dir==='-'     ? '-' : '+';
    
    return `${d}${c}`;
}
const sanitizeLimit = (limit: any): Limit => parseInt(String(limit));

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

    const count: Limit = sanitizeLimit(limit);
    if(!isValidLimit(count)) errorStr += 'Invalid limit, it must be a number > 1. Defaults to 10';
    
    const comparator: Comparator = sanitizeComparator(String(sortDirection), String(sortBy));
    if(!isValidSortDirection(String(sortDirection))) errorStr += 'Invalid sort direction, must be asc/desc/-/+';
    if(isValidSortComparator(String(sortBy))) errorStr += 'Invalid sortBy, must be email or createdAt';
    
    if(errorStr.length) {
        console.log('About to throw');
        throw new ExtendedError(409, errorStr, "Unprocessable Entity"); 
    }
    const users = await User.find().sort(comparator).limit(count).exec(); 
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