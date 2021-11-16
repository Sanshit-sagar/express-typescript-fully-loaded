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
    ethereumAddress: string; 
    status: string; 
    ipv4: string;
    mac: string;
    website: string;
    
};


type Homeowner = BaseUser & Address; 
type Hacker = BaseUser & HackerDetails;  


/*
    /api/fake/{doe/user/person/} 
    
    .../john
    .../jane
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

export const createAddress = (): Address => {
    let address: Address = {
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
    };
    return address; 
};


export const createHackerDetails = (username: Pick<BaseUser, 'username'>): HackerDetails => {
    let hackerDetails: HackerDetails = { 
        bitcoinAddress: faker.finance.bitcoinAddress(),
        ethereumAddress: faker.finance.ethereumAddress(),
        status: faker.hacker.phrase(),
        ip: faker.internet.ip(),
        mac: faker.internet.mac(),
        userAgent: faker.internet.userAgent(),
        website: `https://${username}.${faker.internet.domainSuffix()}`,
        lastOnline: faker.date.recent()
    };

    return hackerDetails;
}
