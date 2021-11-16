import mongoose, { ConnectionOptions } from "mongoose";
import bluebird from 'bluebird';
import settings from './settings'

mongoose.Promise = bluebird; 

const mongooseConnectionOptions: ConnectionOptions = { 
    useNewUrlParser: true, 
    useFindAndModify: false, 
    useCreateIndex: true, 
    useUnifiedTopology: true 
};

const connectToMongoDb = async () => {
    
}

    .then(() => {
        logger.info(`Connected to DB.`)
    }).catch(() => {
        logger.info
    })