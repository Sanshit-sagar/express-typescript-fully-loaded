
import { NextFunction, Request, Response } from 'express'

import { User, UserDocument } from '../models/user.model';

import catchAsync from '../lib/catchAsync';
import ExtendedError from '../errors/wrappers/ExtendedError';


const requiredFields: string[] = ['email','password','firstName','lastName'];

type Concat<A extends string, B extends string> = `${A}${B}`;

type InputColumn        =   'email' | 'createdAt';
type InputDirection     =   '+' | '-' | 'desc' | 'asc';
type Direction          =   Extract<InputDirection, "+" | "-">;
type Comparator         =   Concat<Direction, InputColumn>;
type Limit              =   number | typeof NaN;

const sanitizeLimit      = (limit: any): Limit            => parseInt(String(limit));
const sanitizeField      = (field: string)                => field==='email' ? 'email' : 'createdAt';
const sanitizeDirection  = (dir: InputDirection | string): Direction => (
    dir.length>1 ? dir==='desc' ? '-':'+' : dir==='-' ? '-':'+'
);
const sanitizeComparator = (dir: InputDirection | string, comp: InputColumn | string): Comparator => (
    `${sanitizeDirection(dir)}${sanitizeField(comp)}`
);

const isValidLimit          = (limit: any): boolean  => limit && limit!==NaN && typeof limit === 'number' && limit > 1; 
const isValidSortDirection  = (dir: string): boolean => dir === 'asc' || dir === 'desc' ||  dir === '-' || dir === '+';
const isValidSortComparator = (comparator: string)   => comparator !== 'email' && comparator !== 'createdAt';

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

    let errorStr: string         =  '';
    const count: Limit           =  sanitizeLimit(limit);
    const comparator: Comparator =  sanitizeComparator(String(sortDirection), String(sortBy));

    if(!isValidLimit(count)) errorStr                         += 'Invalid limit, it must be a number > 1. Defaults to 10';
    if(!isValidSortDirection(String(sortDirection))) errorStr += 'Invalid sort direction, valid values are asc/desc/-/+';
    if(isValidSortComparator(String(sortBy)))        errorStr += 'Invalid sort column, valid values are email/createdAt';
    
    if(errorStr.length) throw new ExtendedError(409, errorStr, "Unprocessable Entity"); 

    const users: UserDocument[] = await User.find().sort(comparator).limit(count).exec(); 
    return res.status(200).json({ users });
}); 

/**
 * @params id
 */
const getUserById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findOne({ _id: id }); 
  
    if (!user) {
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