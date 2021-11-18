import faker from 'faker';
import { Poser, GenderEnum } from '../../models/poser.model'

const newPoser = (): Poser => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    let poser: Poser = {
        firstName,
        lastName,
        userName: faker.helpers.slugify(`${firstName} ${lastName}`),
        email: faker.internet.email(firstName, lastName),
        avatar: faker.image.avatar(),
        phoneNumber: '1-737-232-4456 x046',
        gender: GenderEnum.MALE
    };
    return poser;
};

export default newPoser

// faker.phone.phoneNumber(),