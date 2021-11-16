import {
    createUser,
    createAddress,
    createHackerDetails
} from './user'

const MAX_BATCH_SIZE = 20; 

const createUsers = (userCount: number) => {
    if(userCount <= 1) throw new Error('createUser() requires >= 1 to be created.');
    
    return [...Array(userCount)].map(() => {
        return {
            ...createUser()
        }
    }); 
}
