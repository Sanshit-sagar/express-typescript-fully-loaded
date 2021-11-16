import {
    createUser,
    createAddress,
    createHackerDetails
} from './user'

const MAX_BATCH_SIZE = 20; 

const createUsers = (userBatchSize: number) => {
    if(userBatchSize <= 1) throw new Error(generateMinBcreateUser() ');
    
    return [...Array(Math.max(userBatchSize, MAX_BATCH_SIZE))].map(() => {
        return {
            ...createUser()
        }
    }); 
}

const createAddresses = (addressBatchSize: number) => {
    if(addressBatchSize <= 1) throw new Error()
}
