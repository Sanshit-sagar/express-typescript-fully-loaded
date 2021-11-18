import faker from 'faker';
import { Poser } from '../../models/poser.model'

const createUser = (): Poser => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    let poser: Poser = {
        firstName,
        lastName,
        userName: faker.helpers.slugify(`${firstName} ${lastName}`),
        email: faker.internet.email(firstName, lastName),
        avatar: faker.image.avatar(),
        phoneNumber: faker.phone.phoneNumber()
    };
    return poser;
};

