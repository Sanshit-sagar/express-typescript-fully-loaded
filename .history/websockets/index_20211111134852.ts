import WebSocket from 'ws';
import queryString from 'query-string';

import { Express } from 'express';
import { IncomingMessage } from 'http';

function generateConnectionString(connectionRequest: IncomingMessage) {
    const [path, params] = connectionRequest?.url?.split("?");

    return JSON.stringify({ 
        message: 'Successfully connected',
        data: queryString.parse(params),
        path: path
    });
}

function generateMessageString(message: string) {
    return JSON.stringify({ 
        recieved: {
            raw: message,
            parsed: `${JSON.parse(message)}`,
        },
        response: `Thanks for that.`
    });
}

function handleLog

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

    socketServer.on("connection", function connection(socketClient: WebSocket, connectionRequest: IncomingMessage) {
        console.log(`Socket opened. Number of clients: ${socketServer.clients.size} (+1)`)

        socketClient.send(generateConnectionString(connectionRequest)); 
        
        socketClient.on("message", (message: string) => {
            console.log(message);
            socketClient.send(generateMessageString(message));
        });

        socketClient.on("close", (_socketClient) => {
            console.log(logInfo(socketServer)); 
        })
    }); 

    return socketServer; 
}