import {
    createUser,
    createAddress,
    createHackerDetails
} from './user'

const MAX_BATCH_SIZE = 20; 

const createUsers = (userBatchSize: number) => {
    if(userBatchSize <= 1) {
        throw new Error('createUser() requires >= 1 to be created.');
    }
    
    return [...Array(Math.max(userBatchSize, MAX_BATCH_SIZE))].map(() => {
        return {
            ...createUser()
        }
    }); 
}

const createAddresses = (addressBatchSize: number) => {
    if()
}
