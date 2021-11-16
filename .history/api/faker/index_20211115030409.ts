import express, { Request, Response, NextFunction } from 'express';
import logger from '../../lib/logger';
import dayjs from 'dayjs';
import faker from 'faker';

const SLUG_DELIMITTERS = /[_,-,.]/;

const timestamp = (): string => dayjs().format('DD/MM/YYYY HH:mm:ss');
// const sanitize = (word: string) => String(word).trim().toLocaleLowerCase();
// const isSluggable = (candidate: string): boolean => !candidate.includes('.') && !candidate.includes('_');

// const getSluggableUserName = (): string => {
//     let candidate = faker.internet.userName();
//     while(!isSluggable(candidate)) {
//         candidate = faker.internet.userName();
//     }
//     return candidate;
// }

// const slugifyAndSplit = (word: string, splitCount: number = 2): string[] => {
//     if(splitCount <= 1) return [word];

//     let res = [...sanitize(word).split(SLUG_DELIMITTERS, splitCount + 1)] || [];
//     console.log(word, res);
//     return res; 
// }

// handle if username isnt sluggable by calling slugify
const getUser = () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
       
    return {
        firstName,
        lastName,
        username: faker.helpers.slugify(`${firstName} ${lastName}`),
        email: faker.internet.email(firstName, lastName),
        avatar: faker.image.avatar()
    };
}
const getAddress = () => {
    return {
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
    };
}

const router = express.Router();

router.use(function (req: Request, res: Response, next: NextFunction) {
    logger.info(`${req.method.toUpperCase()} ${req.path} @ ${timestamp()}`);
    const user = getUser()
    next(user); 
});

router.get('/', (req: Request, res: Response) => {
    res.status(200).json(req.param.user);
});

router.get('/user/basic', (req: Request, res: Response) => {
    
    return res.status(200).json(user); 
});

router.get('/user/homeowner', (req: Request, res: Response) => {
    const basicUser = getUser();
    const address = getAddress(); 
    const homeowner = { 
        ...basicUser, 
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

