
import faker from 'faker'
import { Contact } from '../../models/contact.model'

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