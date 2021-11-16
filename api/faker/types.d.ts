import {
    BaseUser, 
    Address, 
    Contact,
    HackerDetails
} from '../../lib/faker/user'

export type UserExtensions = Partial<{
    hacker: HackerDetails;
    contact: Contact;
    address: Address;
}>

export type SkipDictionary = Required<{ 
    [Property in keyof UserExtensions]: boolean; 
}>; 