
import faker from 'faker'
import { Address } from '../../models/address.model'

const newAddress = (userName: string): Address => {
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

export default newAddress;