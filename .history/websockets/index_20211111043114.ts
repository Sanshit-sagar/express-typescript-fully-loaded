import WebSocket from 'ws'
import queryString from 'query-string';

import { Express } from 'express';
import { Server } from 'http';


export default async (expressServer: Server) => {
    const websocketServer = new WebSocket.Server({
        noServer: true,
        path: "./websockets",
    });

    expressServer.on("upgrade", (request, socket, head) => {
        websocketServer.handleUpgrade(request, socket, head, (websocket) => {
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

    return websocketServer; 
}