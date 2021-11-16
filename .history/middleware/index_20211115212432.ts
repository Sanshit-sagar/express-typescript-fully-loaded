import { Express } from "express";

import helmet from 'helmet';
import compression from "compression";
import cookieParser from "cookie-parser";

import cors from "./cors";
import session from "./session"; 
import bodyParser from "./bodyParser";
import staticPaths from "./staticPaths"; 
import requestMethods from "./requestMethods";

export default (app: Express) => {
    app.use(cors);
    app.use(bodyParser);
    app.use(requestMethods);
    app.use(helmet());
    app.use(compression()); 
    app.use(cookieParser());
    app.use(staticPaths);   
    app.use(session);  
    app.use(lusca.xframe("SAMEORIGIN"));
    app.use(lusca.xssProtection(true));
};