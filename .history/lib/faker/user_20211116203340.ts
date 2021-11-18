import faker from 'faker';
import mongoose, { ObjectId } from 'mongoose'
import { Poser } from '../models/poser.model'

// export interface BaseUser {
//     firstName: string;
//     lastName: string;
//     email: string;
//     avatar: string; 
//     userName: string;
// };

// export interface Address {
//     _id: mongoose.Schema.Types.ObjectId;
//     street: string;
//     city: string;
//     state: string;
//     zip: string; 
// };

// export interface Contact {
//     _id: mongoose.Schema.Types.ObjectId; 
//     phoneNumber: string;
//     format: string; 
//     linkedin?: string;
//     facebook?: string;
//     googleplus?: string;
//     instagram?: string;
// }

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
        userName: faker.helpers.slugify(`${firstName} ${lastName}`),
        email: faker.internet.email(firstName, lastName),
        avatar: faker.image.avatar()
    };
    return basicUser;
};

export const createContact = (userName: string): Contact => {
    let contact: Contact = {
        _id: mongoose.Types.ObjectId(),
        phoneNumber: faker.phone.phoneNumber(),
        format: faker.phone.phoneNumberFormat(),
        linkedin: `https://linkedin.com/in/${userName}`,
        facebook: `https://facebook.com/${userName}`,
        googleplus: `https://gplus.com/${userName}`,
        instagram: `https://instagram.com/${userName}`,
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

export const createHackerDetails = (username: Pick<BaseUser, 'userName'>): HackerDetails => {
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
