import { Express } from 'express' 
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

jobQ

jobQueue.start(); 

export default async (app: Express) => {
    app.use('/jobs', (req, res) => {
        res.send('Job added to the queue!'); 
    }); 
}