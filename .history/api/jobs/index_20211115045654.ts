import { Express } from 'express' 
import Agenda from 'agenda'
import settings from '../lib/settings'

const jobQueue = new Agenda({
    db: {
        address: 
    }
})

export default async (app: Express) => {
    app.use('/jobs', (req, res) => {
        res.send('Job added to the queue!'); 
    }); 
}