import { Poser } from '../../models/poser.model'
import { Address } from '../../models/address.model'
import type { ModelName, NewModel } from './modelFactory'
import { NewModel } from './modelFactory'

const MAX_BATCH_SIZE = 20; 


export const createManyUsers = (collectionSize: number): Poser[] => {
    if(userBatchSize <= 1) {
        throw new Error('createUsers() requires > 1  users to be created.');
    }
    
    return [...Array(Math.max(userBatchSize, MAX_BATCH_SIZE))].map(() => {
        return {
            ...createUser()
        }
    }); 
}