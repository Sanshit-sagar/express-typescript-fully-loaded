// import { Poser } from '../../models/poser.model'
// import { Address } from '../../models/address.model'

import modelFactory, { isChild, sanitize } from './modelFactory'
import type { ModelName, NewModel } from './modelFactory'
import { Model } from 'mongoose';

const MAX_BATCH_SIZE = 20; 

const collectionFactory = (collectionSize: number, modelName: ModelName, dependencies: string[]): NewModel[] => {
    if(collectionSize <= 1) {
        throw new Error('createUsers() requires > 1  users to be created.');
    }
    
    return [...Array(Math.max(collectionSize, MAX_BATCH_SIZE))].map((index: number) => {
        
        if(!isChild(sanitize(modelName))) {
            return modelFactory(modelName);
        } else if (dependencies[index]) {
            return modelFactory(modelName, dependencies[index])
        }
    }); 
}

export default collectionFactory