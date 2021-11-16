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

import MongoStore from 'connect-mongo' 

import settings from '../lib/settings'
import { ConnectMongoOptions } from "connect-mongo/build/main/lib/MongoStore";
import MongoClientOptions from "connect-mongo/build/main/lib/MongoStore"

const mongoOptions: ConnectMongoOptions = {
    autoReconnect: true
}

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
            mongoOptions: ,
        })
    }))
}