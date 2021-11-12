// import express, { Request, Response } from 'express';
const routes = require('express').Router();

routes.all('/api/route1', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;

// const routeOneHandler = express.Router();

// routeOneHandler.all('/api/route1', (req: Request, res: Response) => {
//     res.status(200).json({
//         message: 'retreival was a success!',
//         path: '/api/route1',
//         method: req.method
//     });
// });

// export default routeOneHandler;