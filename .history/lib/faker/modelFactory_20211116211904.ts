import newPoser from './newPoser'
import newContact from './newContact'
import newAddress from './newAddress'
import { Poser } from '../../models/poser.model'
import { Contact } from '../../models/contact.model'
import { Address } from '../../models/address.model'

export type ModelName = 'poser' | 'Contact' | 'Address';
export type NewModel = Poser | Contact | Address | Error

const modelFactory = (modelName: ModelName, userName?: string): NewModel => {
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

export default modelFactory;