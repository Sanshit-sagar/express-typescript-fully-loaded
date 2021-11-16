import mongoose, { ConnectionOptions } from "mongoose";
import bluebird from 'bluebird';

mongoose.Promise = bluebird; 

const mongooseConnectionOptions: ConnectionOptions = { 
    useNewUrlParser: true, 
    useFindAndModify: false, 
    useCreateIndex: true, 
    useUnifiedTopology: true 
};

mongoose.connect(settings.databases.mongodb.uri, mongooseConnectionOptions)
    .then(() => {
        logger.info(`Connected to DB.`)
    }).catch(() => {
        logger.info
    })