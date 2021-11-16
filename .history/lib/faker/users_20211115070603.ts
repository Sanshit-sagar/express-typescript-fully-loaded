import {
    createUser,
    createAddress,
    createHackerDetails,
    HackerDetails, Address, BaseUser
} from './user'

const MAX_BATCH_SIZE = 20; 

export const createUsers = (userBatchSize: number): BaseUser[] => {
    if(userBatchSize <= 1) throw new Error('createUsers() requires > 1  users to be created.');
    
    return [...Array(Math.max(userBatchSize, MAX_BATCH_SIZE))].map(() => {
        return {
            ...createUser()
        }
    }); 
}

export const createAddresses = (addressBatchSize: number): Address[] => {
    if(addressBatchSize <= 1) throw new Error('createAddresses() requires > 1 addresses to be created.');

    return [...Array(Math.max(addressBatchSize, MAX_BATCH_SIZE))].map(() => {
        return {
            ...createAddress()
        }
    }); 
}

type UserProp = Address[] | HackerDetails[]; 
type UserExtensions = Partial<Address> & Partial<HackerDetails>

const collateUsers = (baseUsers: BaseUser[], indexedProperties: UserDetailSubsets[]): UserExtensions[] => {
    return baseUsers.map((baseUser, userIndex) => {
        return {
            ...baseUser,
            ...indexedProperties[0][userIndex],
            ...indexedProperties[1][userIndex]
        };
    });
}

