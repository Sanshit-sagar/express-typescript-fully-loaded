import { Express, Request, Response } from 'express' 
import Agenda from 'agenda'
import settings from '../../lib/settings'

const jobQueue = new Agenda({
    db: {
        address: settings.databases.mongodb.uri,
        collection: "jobs"
    },
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

export default async (app: Express) => {
    app.use('/jobs', (req: Request, res: Response) => {
        const jobType = req?.query?.jobType;
        const allowedJobs = Object.keys(jobQueue._definitions); 
        
        if(!jobType) {
            return res.send("Must pass a jobType in the query params");
        }


        res.send('Job added to the queue!'); 
    }); 
}