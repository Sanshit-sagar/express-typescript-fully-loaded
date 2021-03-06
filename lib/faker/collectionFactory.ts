import modelFactory, { isChild, sanitize } from './modelFactory'
import type { ModelName, NewModel } from './modelFactory'

const MAX_BATCH_SIZE = 20; 

const collectionFactory = (collectionSize: number, modelName: ModelName, dependencies: string[]): NewModel[] => {
    if(collectionSize <= 1)  throw new Error('createUsers() requires > 1  users to be created.');
    if(collectionSize > MAX_BATCH_SIZE) throw new Error(`Max ${MAX_BATCH_SIZE} ${modelName}s can be created at once.`)
    
    return [...Array(Math.max(collectionSize, MAX_BATCH_SIZE))].map((index: number) => {
        
        if(!isChild(sanitize(modelName))) {
            return modelFactory(modelName);
        } else if (dependencies[index]) {
            return modelFactory(modelName, dependencies[index])
        }
    }); 
}

export default collectionFactory