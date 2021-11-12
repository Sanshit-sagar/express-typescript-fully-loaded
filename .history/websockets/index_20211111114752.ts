import WebSocket from 'ws';
// import queryString from 'query-string';

import { Express } from 'express';
import { Socket } from 'net';
import { IncomingMessage } from 'http';

export default async (app: Express) => {
    const socketServer = new WebSocket.Server({
        port: 3030,
        path: "/websockets"
    }); 

   
    app.on("upgrade", (request: IncomingMessage, socket: Socket, upgradeHead: Buffer) => {
        socketServer.handleUpgrade(request, socket, upgradeHead, (websocket) => {
            socketServer.emit("connection", websocket, request);
        });
    });

    socketServer.on("connection", function connection(socketClient) {
        console.log(`Socket opened. Number of clients: ${socketServer.clients.size} (+1)`)
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

    return socketServer; 
}