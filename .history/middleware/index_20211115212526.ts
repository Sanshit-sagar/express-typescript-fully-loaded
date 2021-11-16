import { Express } from "express";

import lusca from 'lusca'
import helmet from 'helmet';
import compression from "compression";
import cookieParser from "cookie-parser";

import cors from "./cors";
import session from "./session"; 
import bodyParser from "./bodyParser";
import staticPaths from "./staticPaths"; 
import requestMethods from "./requestMethods";

const SAME_ORIGIN = "SAME_ORIGIN";

export default (app: Express) => {
    app.use(cors);
    app.use(bodyParser);
    app.use(requestMethods);
    app.use(helmet());
    app.use(compression()); 
    app.use(cookieParser());
    app.use(staticPaths);   
    app.use(session);  
    app.use(lusca.xframe(SAME_ORIGIN));
    app.use(lusca.xssProtection(true));
};