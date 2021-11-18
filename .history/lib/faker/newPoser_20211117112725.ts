import faker from 'faker';
import { Poser, GenderEnum } from '../../models/poser.model'

const newPoser = (): Poser => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    let poser: Poser = {
        firstName,
        lastName,
        userName: faker.helpers.slugify(`${firstName} ${lastName}`),
        email: 'Maegan_Satterfield6',
        avatar: faker.image.avatar(),
        phoneNumber: faker.phone.phoneNumber(),
        gender: GenderEnum.MALE
    };
    return poser;
};

export default newPoser

// faker.internet.email(firstName, lastName)