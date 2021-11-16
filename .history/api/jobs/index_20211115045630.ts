import { Express } from 'express' 
import Agenda from 'agenda'

const jobQueue = new

export default async (app: Express) => {
    app.use('/jobs', (req, res) => {
        res.send('Job added to the queue!'); 
    }); 
}