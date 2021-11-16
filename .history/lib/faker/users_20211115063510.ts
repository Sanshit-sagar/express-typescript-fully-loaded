import {
    createUser,
    createAddress,
    createHackerDetails
} from './user'


const createUsers = (userCount: number) => {
    if(userCount <= 1) throw new Error('createUser() requires >= 1 to be created.');
    
    userCount = Math.max(userCount, 20);
}
