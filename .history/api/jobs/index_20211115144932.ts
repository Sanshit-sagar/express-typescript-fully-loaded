import express, { Request, Response, NextFunction } from 'express' 
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

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

const jobsRouter = express.Router();

jobsRouter.use(function(req: Request, res: Response, next: NextFunction) {
    const jobType = String(res?.locals?.jobType);
    console.log(`Inside job queue with data: ${JSON.stringify(res.locals)}`); 

    const allowedJobs = Object.keys(jobQueue._definitions); 

    if(!jobType) {
        return res.send("Must pass a jobType in the query params");
    }

    if(!allowedJobs.includes(jobType)) {
        return res.send(
            `${jobType} is not supported. Must pass one of ${allowedJobs.join(
                ", or "
            )} as jobType in the query params.`
        );
    }

    if(jobType === "instantJob") {
        jobQueue.now(jobType, req.locals);
    }

    if(jobType === "delayedJob") {
        jobQueue.schedule(
            dayjs().add(5, "seconds").format(),
            jobType,
            req.body
        );
    }

    res.send('Job added to the queue!'); 
})

export default jobsRouter; 




// export default async (app: Express) => {
//     app.use('/api/jobs', (req: Request, res: Response) => {
      

//            }); 
// }