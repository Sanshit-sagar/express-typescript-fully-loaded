import express, { Express, Request, Response } from 'express' 
import Agenda from 'agenda'
import dayjs from 'dayjs'
import settings from '../../lib/settings'


const jobQueue = new Agenda({
    db: {
        address: settings.databases.mongodb.uri,
        collection: "jobs"
    }
}); 

jobQueue.define("instantJob", async (job) => {
    const data = job?.attrs?.data;
    console.log(
        "This job is running as soon as it was received. This is the data that was sent:"
    );
    console.log(data);
});

jobQueue.define("delayedJob", async (job) => {
    const data = job?.attrs?.data;
    console.log(
        "This job is running after a 5 sec delay. This is the data that was sent:"
    );
    console.log(data); 
})

jobQueue.start(); 

const router = express.Router();

router.use(function(req: Request, res: Response, next: NextFunction) {

})

export default async (app: Express) => {
    app.use('/api/jobs', (req: Request, res: Response) => {
      

           }); 
}