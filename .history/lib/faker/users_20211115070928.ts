import {
    createUser,
    createAddress,
    createHackerDetails,
    HackerDetails, Address, BaseUser
} from './user'

const MAX_BATCH_SIZE = 20; 

export const createManyUsers = (userBatchSize: number): BaseUser[] => {
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

export const createManyHackerDetails = (batchSize: number): HackerDetails[] => {
    if(batchSize <= 1) throw new Error('createHackerDetails() requires > 1 addresses to be created.');

    return [...Array(Math.max(batchSize, MAX_BATCH_SIZE))].map(() => {
        return {
            ...createHackerDetails()
        }
    }); 
}

type UserPropByGroup = Address[] | HackerDetails[]; 
type UserExtensions = Partial<Address> & Partial<HackerDetails>

const collateUsers = (baseUsers: BaseUser[], indexedProperties: UserPropByGroup[]): UserExtensions[] => {
    return baseUsers.map((baseUser, userIndex) => {
        return {
            ...baseUser,
            ...indexedProperties[0][userIndex],
            ...indexedProperties[1][userIndex]
        };
    });
}
