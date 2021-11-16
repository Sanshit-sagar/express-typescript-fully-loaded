import express, { Express } from "express";

import path from 'path';
import lusca from 'lusca';
import helmet from 'helmet';
import session from "express-session";
import compression from "compression";
import MongoStore from 'connect-mongo';
import cookieParser from "cookie-parser";

import cors from "./cors"; 
import bodyParser from "./bodyParser";
import requestMethods from "./requestMethods";

import settings from '../lib/settings'; 
import logger from '../lib/logger';

const SAME_ORIGIN = "SAMEORIGIN";

export default (app: Express) => {
    app.use(cors);
    app.use(bodyParser);
    app.use(requestMethods);
    app.use(helmet());
    app.use(compression()); 
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, "public"), { 
        maxAge: 31557600000 
    }));   
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: settings.session.secret,
        store: new MongoStore({
            mongoUrl: settings.databases.mongodb.uri
        })
    }));   
    app.use(lusca.xframe(SAME_ORIGIN));
    app.use(lusca.xssProtection(true));
    app.use(function(req, res, next) {
        if(req.query) {
            logger.info(`Query: ${JSON.stringify(req.query)}`); 
        }
        if(req.body) {
            logger.info(`Body: ${JSON.stringify(req.body)}`); 
        }
    })
};