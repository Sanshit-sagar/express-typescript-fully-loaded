import express from "express";


import cors from "./cors";
import bodyParser from "./bodyParser";
import compression from "compression";
import cookieParser from "cookie-parser";
import requestMethods from "./requestMethods"

export default (app: Express) => {
    app.use(requestMethods);
    app.use(compression()); 
    app.use(express.static("public")); 
    app.use(cors);
    app.use(bodyParser);
    app.use(cookieParser());
}