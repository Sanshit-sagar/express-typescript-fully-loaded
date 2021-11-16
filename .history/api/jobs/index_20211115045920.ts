import { Express } from 'express' 
import Agenda from 'agenda'
import settings from '../../lib/settings'

const jobQueue = new Agenda({
    db: {
        address: settings.databases.mongodb.uri,
        collection: "jobs"
    },
}); 

jobQueue.

jobQueue.start(); 

export default async (app: Express) => {
    app.use('/jobs', (req, res) => {
        res.send('Job added to the queue!'); 
    }); 
}