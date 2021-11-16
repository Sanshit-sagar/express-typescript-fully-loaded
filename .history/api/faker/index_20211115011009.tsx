import express, { Express, Request, Response, NextFunction} from 'express';
import logger from '../../lib/logger'
import dayjs from 'dayjs'
import faker from 'faker'

function getDatetime(): string {
    return dayjs().format('DD/MM/YYYY HH:mm:ss');
}

const router = express.Router();

router.use(function (req: Request, res: Response, next: NextFunction) {
    logger.info(`${req.method.toUpperCase()} ${req.path} @ ${getDatetime()}`);
    next(); 
});

router.get('/', (req: Request, res: Response) => {
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
                zip: faker.address.zip(),
            }
        };
    });

    res.status(200).send(JSON.stringify())
})

