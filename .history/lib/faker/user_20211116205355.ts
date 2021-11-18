import faker from 'faker';
// import mongoose, { ObjectId } from 'mongoose'

import { Poser } from '../../models/poser.model'
import { Contact } from '../../models/contact.model'
import { Address } from '../../models/address.model'


export const createUser = (): Poser => {
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

export const createContact = (userName: string): Contact => {
    let contact: Contact = {
        phoneNumber: faker.phone.phoneNumber(),
        format: faker.phone.phoneNumberFormat(),
        linkedin: `https://linkedin.com/in/${userName}`,
        facebook: `https://facebook.com/${userName}`,
        googleplus: `https://gplus.com/${userName}`,
        instagram: `https://instagram.com/${userName}`,
        userName
    }; 

    return contact; 
}

export const createAddress = (userName: string): Address => {
    let address: Address = {
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.country(),
        postalCode: faker.address.zipCode(),
        userName
    };
    return address; 
};
