import express, { Express, Request, Response } from 'express';

import dotenv from 'dotenv';
import helmet from 'helmet';
import bodyParser from "../middleware/bodyParser";
import requestMethods from "../middleware/requestMethods";

import logger from '../lib/logger'
import startup from '../lib/startup'
// import websockets from '../websockets/index.js'

import { IncomingMessage, Server } from 'http';
import WebSocket from 'ws'
import queryString from 'query-string';
import { Socket } from 'net';

startup()
    .then(() => {
        dotenv.config();

        const app: Express = express();   
        const port = process.env.PORT || 3000; 
      
        app.use(helmet());
        app.use(bodyParser);
        app.use(requestMethods);

        app.get('/api/route1', (req, res) => {
            res.status(200).json({
                message: 'success!',
                path: '/api/route1',
            });
        });

        const server: Server = app.listen(port, () => {
            if(process.send) {
                process.send(`Process running at http://localhost:${port}\n\n ⚡`); 
            }
        });

                
                
        const websocketServer = new WebSocket.Server({
            port: 3001
        }); 

        app.on("upgrade", (parent: Application<Record<string, any>>) => {
            websocketServer.handleUpgrade(request: IncomingMessage, socket: Socket, upgradeHead: Buffer, (websocket => {
                websocketServer.emit("connection", websocket, request);
            });
        });
    
        websocketServer.on("connection", function connection(websocketConnection, connectionRequest) {
            const [_path, params] = connectionRequest?.url?.split("?") ?? ['', ''];
            const connectionParams = queryString.parse(params); 
    
            console.log(connectionParams);
    
            websocketConnection.on("message", (message: string) => {
                const parsedMessage = JSON.parse(message);
                console.log(parsedMessage);
                websocketConnection.send(JSON.stringify({ message: 'There be gold in them thar hills.' }));
            });
        }); 

        process.on("message", (message) => {
            console.log(message); 
        });
    })
    .catch((error: Error) => {
        logger.error(error);
    });


// app.get('/', (req: Request, res: Response) => {
//     res.status(200).send({ message: 'Hello from v0.0.5' }); 
// });

// app.listen(PORT, () => console.log(`Running on port ${PORT} ⚡`)); 
