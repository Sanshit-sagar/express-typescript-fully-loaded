import { Express } from 'express';
import Websocket from 'ws';
import queryString from 'query-string';
import { IncomingMessage } from 'http';
import { Socket } from 'net';

export default (expressServer: Express) => {
    const websocketServer = new Websocket.Server({
        noServer: true,
        path: "./websockets",
    });

    expressServer.on("upgrade", (request: IncomingMessage, socket: Socket, head: Buffer) => {
        websocketServer.handleUpgrade(request, socket, head, (websocket: Websocket) => {
            websocketServer.emit("connection", websocket, request); 
        })
    });

    websocketServer.on("connection", function connection(websocketConnection, connectionRequest) {
        const [_path, params] = connectionRequest?.url?.split("?") ?? ['', ''];
        const connectionParams = queryString.parse(params); 

        console.log(connectionParams);

        websocketConnection.on("message", (message: string) => {
            const parsedMessage = JSON.parse(message);
            console.log(parsedMessage);
            websocketClient.send(JSON.stringify({ message: 'There be gold in them thar hills.' }));
          });
    }); 

    return websocketServer; 
}