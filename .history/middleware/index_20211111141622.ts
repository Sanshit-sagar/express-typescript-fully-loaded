import express, { Express } from "express";

import helmet from 'helmet';
import compression from "compression";
import cookieParser from "cookie-parser";

import cors from "./cors";
import bodyParser from "./bodyParser";
import requestMethods from "./requestMethods"

export default (app: Express) => {
    app.use(requestMethods);
    app.use(cors);
    app.use(bodyParser);
    app.use(helmet());
    app.use(compression()); 
    app.use(cookieParser());
    app.use(express.static("public")); 
}