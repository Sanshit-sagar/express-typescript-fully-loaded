import newPoser from './newPoser'
import newContact from './newContact'
import newAddress from './newAddress'
import { Poser } from '../../models/poser.model'
import { Contact } from '../../models/contact.model'
import { Address } from '../../models/address.model'

type FakeModelName = 'Poser' | 'Contact' | 'Address';

const fakeModelFactory = (modelName: FakeModelName, userName?: string) => {

    if((modelName==='Contact' || modelName==='Address') && !userName) {
        throw new Error('UserName is required');
    }

    switch(modelName) {
        case 'Contact':
            return newContact(userName); 
        case 'Address':
            return newAddress(userName);
        default:
            return newPoser(); 
    }
}