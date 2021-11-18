import newPoser from './newPoser'
import newContact from './newContact'
import newAddress from './newAddress'
import { Poser } from '../../models/poser.model'
import { Contact } from '../../models/contact.model'
import { Address } from '../../models/address.model'

export type ModelName = 'poser' | 'contact' | 'address';
export type NewModel = Poser | Contact | Address | Error

export const sanitize = (text: string) => String(text).trim().toLowerCase(); 
const isChild = (modelName: string) => modelName==='contact' || modelName==='address'; 

const modelFactory = (modelName: ModelName, userName?: string): NewModel => {
    if(isChild(sanitize(modelName)) && !userName) {
        throw new Error('UserName is required');
    }

    switch(sanitize(modelName)) {
        case 'contact':
            return newContact(userName); 
        case 'address':
            return newAddress(userName);
        default:
            return newPoser(); 
    }
}

export default modelFactory;