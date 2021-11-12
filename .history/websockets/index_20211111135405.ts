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

function handleLog(connectionType: string, socketServer) {
    console.log(connectionType === 'close'
        ? `Socket closed. Number of clients: ${socketServer.clients.size} (-1)`
        : `Socket closed. Number of clients: ${socketServer.clients.size} (+1)`); 
}

export default async (app: Express) => {
    const socketServer = new WebSocket.Server({
        port: 3030,
        path: "/websockets"
    }); 

    // @ts-ignore
    app.on("upgrade", (request: IncomingMessage, socket: WebSocket, upgradeHead) => {
        socketServer.handleUpgrade(request, socket, upgradeHead, (websocket: WebSocket) => {
            socketServer.emit("connection", websocket, request);
        });
    });

    socketServer.on("connection", function connection(socketClient: WebSocket, connectionRequest: IncomingMessage) {
        handleLog('open', socketServer)
        socketClient.send(generateConnectionString(connectionRequest)); 
        
        socketClient.on("message", (message: string) => {
            socketClient.send(generateMessageString(message));
        });

        socketClient.on("close", (_socketClient) => handleLog('close', socketServer));
    }); 

    return socketServer; 
}