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
    const [firstName, lastName] = slugifyAndSplit(sluggableUsername);

    return {
        slug: sluggableUsername,
        firstName,
        lastName: faker.
        email: faker.internet.email(firstName, lastName)
    }
}

const router = express.Router();

router.use(function (req: Request, res: Response, next: NextFunction) {
    logger.info(`${req.method.toUpperCase()} ${req.path} @ ${timestamp()}`);
    next(); 
});

router.get('/', (req: Request, res: Response) => {
    const deepInsight = faker.hacker.phrase();
    res.status(200).json(deepInsight);
});

router.get('/user/basic', (req: Request, res: Response) => {
    const user = getUser()
    return res.status(200).json(user); 
});

router.get('/user/homeowner', (req: Request, res: Response) => {
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

