import { Express } from "express";

import helmet from 'helmet';
import compression from "compression";
import cookieParser from "cookie-parser";

import cors from "./cors";
import static from './static'
import bodyParser from "./bodyParser";
import requestMethods from "./requestMethods";

export default (app: Express) => {
    app.use(cors);
    app.use(bodyParser);
    app.use(requestMethods);
    app.use(helmet());
    app.use(compression()); 
    app.use(cookieParser());
    app.use(static);   
    app.use(session);  
}





// import { ConnectMongoOptions } from "connect-mongo/build/main/lib/MongoStore";
// import MongoClientOptions from "connect-mongo/build/main/lib/MongoStore"
