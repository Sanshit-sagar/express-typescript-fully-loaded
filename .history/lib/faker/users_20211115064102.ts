import {
    createUser,
    createAddress,
    createHackerDetails
} from './user'

const MAX_BATCH_SIZE = 20; 

const createUsers: BaseUser[] = (userBatchSize: number) => {
    if(userBatchSize <= 1) throw new Error('createUsers() requires > 1  users to be created.');
    
    return [...Array(Math.max(userBatchSize, MAX_BATCH_SIZE))].map(() => {
        return {
            ...createUser()
        }
    }); 
}

const createAddresses: Address[] = (addressBatchSize: number) => {
    if(addressBatchSize <= 1) throw new Error('createAddresses() requires > 1 addresses to be created.');

    return [...Array(Math.max(addressBatchSize, MAX_BATCH_SIZE))].map(() => {
        return {
            ...createAddress()
        }
    }); 
}

const collateUserFields = ()
