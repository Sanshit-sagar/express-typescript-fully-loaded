import express, { Express } from 'express';

import dotenv from 'dotenv';

import api from '../api/index'; 
// import jobs from '../api/jobs';
import middleware from "../middleware"; 
import websockets from '../websockets';

import logger from "../lib/logger";
import startup from "../lib/startup";

import mongoose from "mongoose";
import bluebird from "bluebird";
// import passport from 'passport'

import settings from '../lib/settings'
// import * as passportConfig from '../config/passport'

const MONGO_URL = settings.databases.mongodb.uri;
mongoose.Promise = bluebird; 

// const mongooseConnection: Promise<typeof mongoose> = 
mongoose.connect(MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    logger.info(`Connected to DB.`); 
}); 

startup()
    .then(() => {
        dotenv.config();

        const app: Express = express();   
        const port = process.env.PORT || 3000; 
      
        logger.info(`Sending through middleware`);
        middleware(app); 
        logger.info(`Returned from middleware`);
        api(app); 
        logger.info(`Sending through middleware`);

        app.listen(port, () => {
            if(process.send) {
                process.send(`Process running at http://localhost:${port}\n\n ⚡`); 
            }
        });

        websockets(app);

        process.on("message", (message: string) => {
            logger.info(`Recieved message: ${message}`);
        });
    })
    .catch((error: Error) => {
        logger.error(error);
    });