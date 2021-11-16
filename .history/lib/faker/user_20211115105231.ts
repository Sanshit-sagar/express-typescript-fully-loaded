import faker from 'faker';

export interface BaseUser {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string; 
    username: string;
};

export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string; 
};

export interface Contact {
    phoneNumber: string;
    format: string; 
    linkedin?: string;
    facebook?: string;
    googleplus?: string;
    instagram?: string;
}

export interface HackerDetails {
    bitcoinAddress: string;
    ethereumAddress: string; 
    status: string; 
    ipv4: string;
    mac: string;
    website: string;
    userAgent: string;
    lastOnline: Date; 
};


type Homeowner = BaseUser & Address; 
type Hacker = BaseUser & HackerDetails;  


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

export const createContact = (username: Pick<BaseUser, 'username'>): Contact => {
    let contact: Contact = {
        phoneNumber: faker.phone.phoneNumber(),
        format: faker.phone.phoneNumberFormat(),
        linkedin: `https://linkedin.com/in/${username}`,
        facebook: `https://facebook.com/${username}`,
        googleplus: `https://fa`,
        instagram: '',
    }; 
    return contact; 
}

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
        ipv4: faker.internet.ip(),
        mac: faker.internet.mac(),
        userAgent: faker.internet.userAgent(),
        website: `https://${username}.${faker.internet.domainSuffix()}`,
        lastOnline: faker.date.recent()
    };

    return hackerDetails;
}
