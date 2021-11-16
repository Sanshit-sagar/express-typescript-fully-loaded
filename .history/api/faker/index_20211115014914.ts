import express, { Request, Response, NextFunction } from 'express';
import logger from '../../lib/logger';
import dayjs from 'dayjs';
import faker from 'faker';

const getDatetime = (): string => dayjs().format('DD/MM/YYYY HH:mm:ss');

const isUserNameSluggable = (username: string) => {
    return !username.includes('.') && !username.includes('_')
}

const getSluggableUserName = (): string => {
    let candidate = faker.internet.userName();
    while(!isUserNameSluggable(candidate)) {
        candidate = faker.internet.userName();
    }
    return candidate;
}

const getUserFromSluggableUsername = (sluggableUsername: string) => {
    return {
        
    }
}

const router = express.Router();

router.use(function (req: Request, res: Response, next: NextFunction) {
    logger.info(`${req.method.toUpperCase()} ${req.path} @ ${getDatetime()}`);
    next(); 
});

router.get('/', (req: Request, res: Response) => {

});

router.get('/user/:userId', (req: Request, res: Response) => {
    const user = {
        username: getSluggableUsername(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
    },

})

router.get('/user/homey', (req: Request, res: Response) => {
    const users = [...Array(50)].map(() => {
        return {
            name: {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
            },
            emailAddress: faker.internet.email(),
            address: {
                street: faker.address.streetAddress(),
                city: faker.address.city(),
                state: faker.address.state(),
                zip: faker.address.zipCode(),
            }
        };
    });

    res.status(200).send(JSON.stringify(users, null, 2)); 
});

router.get('/route1', (req: Request, res: Response) => {
    res.send('/fake/route1');
});

export default router; 

