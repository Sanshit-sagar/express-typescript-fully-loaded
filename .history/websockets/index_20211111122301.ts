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

    socketServer.on("connection", function connection(socketClient, connectionRequest) {
        console.log(`Socket opened. Number of clients: ${socketServer.clients.size} (+1)`)

        const [_path, params] = connectionRequest?.url?.split("?");

        socketClient.send(JSON.stringify({ 
            message: 'Successfully connected',
            path: queryString.parse(params),
            data: queryString.parse(socketClient?.url?.split("?")[1]),
            testing: "testing"
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