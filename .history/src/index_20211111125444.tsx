import express, { Express } from 'express';

import dotenv from 'dotenv';

import logger from "../lib/logger";
import startup from "../lib/startup";

import middleware from "../middleware"
import websockets from '../websockets';

startup()
    .then(() => {
        dotenv.config();

        const app: Express = express();   
        const port = process.env.PORT || 3000; 
      
        // app.use(helmet());
        // app.use(bodyParser);
        // app.use(requestMethods);
        // app.use(compression()); 
        middleware(app); 

        app.get('/api/route1', (req, res) => {
            res.status(200).json({
                message: 'success!',
                path: '/api/route1',
                method: req.method
            });
        });
        
        app.delete('/api/route1', (req: Request, res) => {
            res.status(200).json({
                message: 'success!',
                path: '/api/route1',
                method: req.method
            });
        });

        app.listen(port, () => {
            if(process.send) {
                process.send(`Process running at http://localhost:${port}\n\n ⚡`); 
            }
        });

        websockets(app);

        process.on("message", (message: string) => {
            logger.log(`Recieved message: ${message}`);
            console.log(message); 
        });
    })
    .catch((error: Error) => {
        logger.error(error);
    });