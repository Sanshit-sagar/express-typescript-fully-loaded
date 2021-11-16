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

const connectToMongoDb = async (): Promise<void> => {
    await mongoose.connect(settings.databases.mongodb.uri, mongooseConnectionOptions);
}

export default async () => {
    await connectToMongoDb(); 

    log
}