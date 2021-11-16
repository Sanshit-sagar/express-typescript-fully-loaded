import {
    createUser,
    createAddress,
    createHackerDetails,
    HackerDetails, Address, BaseUser
} from './user'

const MAX_BATCH_SIZE = 20; 

const createUsers = (userBatchSize: number): BaseUser[] => {
    if(userBatchSize <= 1) throw new Error('createUsers() requires > 1  users to be created.');
    
    return [...Array(Math.max(userBatchSize, MAX_BATCH_SIZE))].map(() => {
        return {
            ...createUser()
        }
    }); 
}

const createAddresses = (addressBatchSize: number): Address[] => {
    if(addressBatchSize <= 1) throw new Error('createAddresses() requires > 1 addresses to be created.');

    return [...Array(Math.max(addressBatchSize, MAX_BATCH_SIZE))].map(() => {
        return {
            ...createAddress()
        }
    }); 
}

type UserProperties = Address[] | HackerDetails[];

const collateUsers = (baseUsers: BaseUser[], indexedProperties: UserProperties[])
