import { Express } from 'express' 
import Agenda from 'agenda'


export default async (app: Express) => {
    app.use('/jobs', (req, res) => {
        res.send('Job added to the queue!'); 
    }); 
}