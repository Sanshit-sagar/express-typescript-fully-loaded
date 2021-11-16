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

const MONGODB_URL: string = settings.databases.mongodb.uri;

const connectToMongoDb = async (): Promise<void> => {
    await mongoose.connect(MONGODB_URL, mongooseConnectionOptions).then(() => {
        
    })
}