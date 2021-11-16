import { Express } from 'express' 

export default async (app: Express) => {

    app.use('/jobs', (req, res) => {
        res.send('Job added to the queue!'); 
    }); 
}