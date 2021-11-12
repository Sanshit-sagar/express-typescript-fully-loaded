import WebSocket from 'ws';
import queryString from 'query-string';

import { Express } from 'express';

export default async (app: Express) => {
    const socketServer = new WebSocket.Server({
        port: 3030,
        path: "/websockets"
    }); 

    // @ts-ignore
    app.on("upgrade", (request, socket, upgradeHead) => {
        socketServer.handleUpgrade(request, socket, upgradeHead, (websocket) => {
            socketServer.emit("connection", websocket, request);
        });
    });

    socketServer.on("connection", function connection(socketClient) {
        console.log(`Socket opened. Number of clients: ${socketServer.clients.size} (+1)`)

        socketClient.send(JSON.stringify({ 
            message: 'yellow yellow',
            yourData:  queryString.parse(socketClient?.url?.split("?")[0])
            yourData: queryString.parse(socketClient?.url?.split("?")[0])
        })); 
        
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