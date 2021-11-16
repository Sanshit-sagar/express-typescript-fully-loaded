import express, { Express } from "express";

import path from 'path'
import lusca from 'lusca'
import helmet from 'helmet';
import compression from "compression";
import cookieParser from "cookie-parser";

import cors from "./cors"; 
import bodyParser from "./bodyParser";
import staticPaths from "./staticPaths"; 
import requestMethods from "./requestMethods";

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
            mongoUrl: settings.databases.mongodb.uri,
            mongoOptions: {

            }
        })
    }));   
    app.use(lusca.xframe(SAME_ORIGIN));
    app.use(lusca.xssProtection(true));
};