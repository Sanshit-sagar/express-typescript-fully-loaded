import express, { Express } from "express";

import cors from "./cors";
import bodyParser from "./bodyParser";
import requestMethods from "./requestMethods"

export default (app: Express) => {
    app.use(requestMethods);
    app.use(cors);
    app.use(bodyParser);
}