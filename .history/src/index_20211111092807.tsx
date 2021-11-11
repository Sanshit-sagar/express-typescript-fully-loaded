import express, { Express } from 'express';

import WebSocket from 'ws';
import dotenv from 'dotenv';
import helmet from 'helmet';

import logger from "../lib/logger";
import startup from "../lib/startup";
import bodyParser from "../middleware/bodyParser";
import requestMethods from "../middleware/requestMethods";

import { Socket } from 'net';
import { IncomingMessage } from 'http';

startup()
    .then(() => {
        dotenv.config();

        const app: Express = express();   
        const port = process.env.PORT || 3000; 
        const messages = ['Welcome to the WebSockets Demo'];
      
        app.use(helmet());
        app.use(bodyParser);
        app.use(requestMethods);

        app.get('/api/route1', (req, res) => {
            res.status(200).json({
                message: 'success!',
                path: '/api/route1',
            });
        });


        app.listen(port, () => {
            if(process.send) {
                process.send(`Process running at http://localhost:${port}\n\n ⚡`); 
            }
        });

        const socketServer = new WebSocket.Server({
            port: 3030,
            path: "/websockets"
        }); 

        // @ts-ignore
        app.on("upgrade", (request: IncomingMessage, socket: Socket, upgradeHead: Buffer) => {
            socketServer.handleUpgrade(request, socket, upgradeHead, (websocket) => {
                socketServer.emit("connection", websocket, request);
            });
        });
    
        socketServer.on("connection", function connection(socketClient) {
            console.log('Socket opened. Number of clients: ${socketServer.clients.size} (+1)')
            socketClient.send(JSON.stringify({ message: 'allo m8' })); 

            // const [_path, params] = connectionRequest?.url?.split("?");
            // const connectionParams = queryString.parse(params);
            // console.log(connectionParams);
            
            socketClient.on("message", (message: string) => {
                console.log(message);
                socketClient.send(JSON.stringify({ 
                    message: `thanks for saying: ${message}` 
                }));
            });

            socketClient.on("close", (_socketClient) => {
                console.log(`Socket closed. Number of clients: ${socketServer.clients.size} (-1)`); 
            })
        }); 

        process.on("message", (message) => {
            console.log(message); 
        });
    })
    .catch((error: Error) => {
        logger.error(error);
    });