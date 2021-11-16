import faker from 'faker';

interface BaseUser {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    avatar: string; 
};

export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string; 
};

export interface HackerDetails {
    bitcoinAddress: string;
    status: string; 
};

export const getUser = (): BaseUser => {
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

export const getAddress = (): Address => {
    let address: Address = {
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
    };
    
    return address; 
};

export const getHackerDetails = (): HackerDetails => {
    let hackerDetails: HackerDetails = { 
        bitcoinAddress: faker.finance.bitcoinAddress(),
        status: faker.hacker.phrase(),
    };

    return hackerDetails;
}
