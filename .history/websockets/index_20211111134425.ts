import WebSocket from 'ws';
import queryString from 'query-string';

import { Express } from 'express';

function generateConnectionString()

function generateMessageString(message: string) {
    return JSON.stringify({ 
        recieved: {
            raw: message,
            parsed: `${JSON.parse(message)}`,
        },
        response: `Thanks for that.`
    });
}

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

        const [path, params] = connectionRequest?.url?.split("?");

        socketClient.send(
            generateConnectionString()
        )); 
        
        socketClient.on("message", (message: string) => {
            console.log(message);
            socketClient.send(
                generateMessageString(message)
            );
        });

        socketClient.on("close", (_socketClient) => {
            console.log(`Socket closed. Number of clients: ${socketServer.clients.size} (-1)`); 
        })
    }); 

    return socketServer; 
}