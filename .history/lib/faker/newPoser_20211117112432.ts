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
        gender: GenderEnum.UNDEFINED
    };
    return poser;
};

phoneNumber: faker.phone.phoneNumber(),
export default newPoser