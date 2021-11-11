import { Express, Request } from 'express';
import Websocket from 'ws';
import queryString from 'query-string';

export default (expressServer: Express) => {
    const websocketServer = new Websocket.Server({
        noServer: true,
        path: "./websockets",
    });

    expressServer.on("upgrade", (request, socket, head) => {
        websocketServer.handleUpgrade(request, socket, head, (websocket: Websocket) => {
            websocketServer.emit("connection", websocket, request); 
        })
    });

    websocketServer.on("connection", function connection(websocketConnection, connectionRequest) {
        const [_path, params]: [string | undefined, string] = connectionRequest?.url?.split("?"); 
        const connectionParams = queryString.parse(params); 

        console.log(connectionParams);

        websocketConnection.on("message", (message: string) => {
            const parsedMessage = JSON.parse(message);
            console.log(parsedMessage); 
            websocketClient.send(JSON.stringify({ message: `No quarter.` }));
        });
    }); 

    return websocketServer; 
}