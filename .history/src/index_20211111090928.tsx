import express, { Express } from 'express';

import path from 'path';
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


        app.get('/chat', (req, res) => {
            res.sendFile(path.join(__dirname, '/Users/sanshitsagar/websocket-server/src/chat.html'));
        });

        app.listen(port, () => {
            if(process.send) {
                process.send(`Process running at http://localhost:${port}\n\n ⚡`); 
            }
        });

        const socketServer = new WebSocket.Server({
            port: 3001,
            path: "/websockets"
        }); 

        // @ts-ignore
        app.on("upgrade", (request: IncomingMessage, socket: Socket, upgradeHead: Buffer) => {
            socketServer.handleUpgrade(request, socket, upgradeHead, (websocket) => {
                socketServer.emit("connection", websocket, request);
            });
        });
    
        socketServer.on("connection", function connection(socketClient) {
            console.log('connected')
            console.log(`(+1) Number of clients ${socketServer.clients.size}`)
            socketClient.send(JSON.stringify(messages)); 
            
            socketClient.on("message", (message: string) => {
                const parsedMessage = JSON.parse(message);
                console.log(parsedMessage);
                socketClient.send(JSON.stringify({ message: 'There be gold in them thar hills.' }));
            });

            socketClient.on("close", (socketClient) => {
                console.log('closed');
                console.log(`(-1) Number of clients: ${socketServer.clients.size}`); 
            })
        }); 

        process.on("message", (message) => {
            console.log(message); 
        });
    })
    .catch((error: Error) => {
        logger.error(error);
    });