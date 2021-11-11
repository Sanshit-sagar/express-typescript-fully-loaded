import express from "express";


import cors from "./cors"
import bodyParser from "./bodyParser"
import requestMethods from "./requestMethods"

export default (app) => {
    app.use(requestMethods);
    app.use(bodyParser);
    app.use(cors);
    app.use(express.static("public")); c
}