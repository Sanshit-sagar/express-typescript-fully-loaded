import faker from 'faker';

export interface BaseUser {
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


type Homeowner = BaseUser & Address; 
type Hacker = BaseUser & HackerDetails;  


/*
    /api/fake/{johndoe/janedoe/doe/user/person/male/female}
*/
export const createUser = (): BaseUser => {
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

/*
    /api/fake/homer 
*/
export const createAddress = (): Address => {
    let address: Address = {
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
    };
    return address; 
};


export const createHackerDetails = (): HackerDetails => {
    let hackerDetails: HackerDetails = { 
        bitcoinAddress: faker.finance.bitcoinAddress(),
        status: faker.hacker.phrase(),
    };

    return hackerDetails;
}
