

import { Poser } from '../../models/poser.model'
import { Contact } from '../../models/contact.model'
import { Address } from '../../models/address.model'

const MAX_BATCH_SIZE = 20; 
const ADDRESS_INDEX = 0; 
const HACKER_DETAILS_INDEX = 1;

type UserPropGroup = Address | HackerDetails;
type UserPropsInGroups = Address[] | HackerDetails[]; 
type CollatedUser = Poser & Partial<Address> & Partial<HackerDetails>;

export const createManyUsers = (userBatchSize: number): Poser[] => {
    if(userBatchSize <= 1) throw new Error('createUsers() requires > 1  users to be created.');
    
    return [...Array(Math.max(userBatchSize, MAX_BATCH_SIZE))].map(() => {
        return {
            ...createUser()
        }
    }); 
}

export const createManyAddresses = (addressBatchSize: number): Address[] => {
    if(addressBatchSize <= 1) throw new Error('createAddresses() requires > 1 addresses to be created.');

    return [...Array(Math.max(addressBatchSize, MAX_BATCH_SIZE))].map(() => {
        return {
            ...createAddress()
        }
    }); 
}

export const collateUsers = (baseUsers: Poser[], allUsersProps: UserPropsInGroups[]): CollatedUser[] => {
    return baseUsers.map((baseUser: Poser, userIndex: number) => {
        let userAddress = allUsersProps[ADDRESS_INDEX][userIndex]
        let userHackerDetails = allUsersProps[HACKER_DETAILS_INDEX][userIndex]
        
        return {
            ...baseUser,
            ...userAddress,
            ...userHackerDetails
        };
    });
}
