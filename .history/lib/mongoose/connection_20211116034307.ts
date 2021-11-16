import mongoose, { ConnectionOptions } from "mongoose";
import bluebird from 'bluebird';
import logger from '../logger'; 
import settings from '../settings';

mongoose.Promise = bluebird; 

const mongooseConnectionOptions: ConnectionOptions = { 
    useNewUrlParser: true, 
    useFindAndModify: false, 
    useCreateIndex: true, 
    useUnifiedTopology: true 
};


export default async (): Promise<void> => {
    await mongoose.connect(MONGODB_URL, mongooseConnectionOptions);
}