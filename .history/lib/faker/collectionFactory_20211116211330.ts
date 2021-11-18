import { Poser } from '../../models/poser.model'
import { Address } from '../../models/address.model'

const MAX_BATCH_SIZE = 20; 


export const createManyUsers = (userBatchSize: number): Poser[] => {
    if(userBatchSize <= 1) {
        throw new Error('createUsers() requires > 1  users to be created.');
    
    return [...Array(Math.max(userBatchSize, MAX_BATCH_SIZE))].map(() => {
        return {
            ...createUser()
        }
    }); 
}