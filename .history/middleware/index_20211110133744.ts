import express from "express";


import cors from "./cors";
import bodyParser from "./bodyParser";
import compression from "compression";
import cookieParser from "cookie-parser";
import requestMethods from "./requestMethods"

export default (app) => {
    app.use(requestMethods);
    app.use(bodyParser);
    app.use(cors);
    app.use(express.static("public")); 
    app.use(compression()); 
    app.use()
}