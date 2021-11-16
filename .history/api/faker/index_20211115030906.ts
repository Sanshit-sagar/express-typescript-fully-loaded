import express, { Request, Response, NextFunction } from 'express';
import logger from '../../lib/logger';
import dayjs from 'dayjs';
import faker from 'faker';

const SLUG_DELIMITTERS = /[_,-,.]/;

const timestamp = (): string => dayjs().format('DD/MM/YYYY HH:mm:ss');

interface BaseUser {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    avatar: string; 
}
interface Address {
    street: string;
    city: string;
    state: string;
    zip: string; 
}

const getUser = (): BaseUser => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    let basicUser: BaseUser = {
        firstName,
        lastName,
        username: faker.helpers.slugify(`${firstName} ${lastName}`),
        email: faker.internet.email(firstName, lastName),
        avatar: faker.image.avatar()
    };
    return basicUser;
};

const getAddress = (): Address=> {
    let address: Address = {
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
    };
    return address; 
}

const router = express.Router();

router.use(function (req: Request, res: Response, next: NextFunction) {
    logger.info(`${req.method.toUpperCase()} ${req.path} @ ${timestamp()}`);
    req.body.user = getUser()
    next(); 
});

router.get('/', (req: Request, res: Response) => {
    res.status(200).json(req.body.user);
});

router.get('/user/homeowner', (req: Request, res: Response) => {
    const address = getAddress(); 
    const homeowner = { 
        ...req.params.user, 
        ...address 
    };

    res.status(200).send(homeowner); 
});

router.get('/user/hacker', (req: Request, res: Response) => {
    const basicUser = getUser();
    const hackerDetails = { 
        bitcoinAddress: faker.finance.bitcoinAddress(),
        status: faker.hacker.phrase(),

    }
})

router.get('/route1', (req: Request, res: Response) => {
    res.send('/fake/route1');
});

export default router; 

