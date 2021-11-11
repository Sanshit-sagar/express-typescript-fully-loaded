import express, { Express } from "express";

import cors from "./cors";
import helmet from 'helmet';
import bodyParser from "./bodyParser";
import compression from "compression";
import cookieParser from "cookie-parser";
import requestMethods from "./requestMethods"

export default (app: Express) => {
    app.use(requestMethods);
    app.use(express.static("public")); 
    app.use(cors);
    app.use(bodyParser);
    app.use(helmet());
    app.use(compression()); 
    app.use(cookieParser());
}