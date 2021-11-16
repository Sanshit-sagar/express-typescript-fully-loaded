import express, { Express } from "express";

import helmet from 'helmet';
import compression from "compression";
import cookieParser from "cookie-parser";

import cors from "./cors";
import bodyParser from "./bodyParser";
import requestMethods from "./requestMethods";

import session from 'express-session'
import passport from 'passport'
import lusca from 'lusca'

import MongoStore, { ConnectMongoOptions } from 'connect-mongo' 

import settings from '../lib/settings'

const a: ConnectMongoOptions = b

export default (app: Express) => {
    app.use(cors);
    app.use(bodyParser);
    app.use(requestMethods);
    app.use(helmet());
    app.use(compression()); 
    app.use(cookieParser());
    app.use(express.static("public")); 
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: settings.session.secret,
        store: new MongoStore({
            mongoUrl: settings.databases.mongodb.uri,
            mongoOptions: {
                autoReconnect: true
            },
        })
    }))
}