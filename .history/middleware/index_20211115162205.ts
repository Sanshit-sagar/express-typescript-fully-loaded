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
import mongoose from 'mongoose'

import settings from '../lib/settings'
import path from 'path'
// import { ConnectMongoOptions } from "connect-mongo/build/main/lib/MongoStore";
// import MongoClientOptions from "connect-mongo/build/main/lib/MongoStore"


export default (app: Express) => {
    app.use(cors);
    app.use(bodyParser);
    app.use(requestMethods);
    app.use(helmet());
    app.use(compression()); 
    app.use(cookieParser());
    app.use(
        express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
    );

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: settings.session.secret,
        store: new MongoStore({
            mongoUrl: settings.databases.mongodb.uri,
            mongoOptions: {
                autoReconnect: true,
            },
        })
    }));

    app.use(lusca.xframe("SAMEORIGIN"));
    app.use(lusca.xssProtection(true));
}