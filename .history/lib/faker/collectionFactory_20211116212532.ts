// import { Poser } from '../../models/poser.model'
// import { Address } from '../../models/address.model'

import { isChild, sanitize } from './modelFactory'
import type { ModelName, NewModel } from './modelFactory'

const MAX_BATCH_SIZE = 20; 

const collectionFactory = (collectionSize: number, modelName: ModelName): NewModel[] => {
    if(collectionSize <= 1) {
        throw new Error('createUsers() requires > 1  users to be created.');
    }
    
    return [...Array(Math.max(collectionSize, MAX_BATCH_SIZE))].map(() => {
        
        if(isChild(sanitize(modelName))) {
            return {
                ...createUser(); 
            }
        } else {
            return {
                ...
            }
        }
    }); 
}

export default collectionFactory