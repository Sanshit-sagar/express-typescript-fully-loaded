import newPoser from './newPoser'
import newContact from './newContact'
import newAddress from './newAddress'
import { Poser } from '../../models/poser.model'
import { Contact } from '../../models/contact.model'
import { Address } from '../../models/address.model'

export type ModelName = 'poser' | 'contact' | 'address';
export type NewModel = Poser | Contact | Address | Error

const modelFactory = (modelName: ModelName, userName?: string): NewModel => {
    if(isSubModule && !userName) {
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

export default modelFactory;