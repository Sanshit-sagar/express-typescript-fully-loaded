import faker from 'faker'
import { Contact } from '../../models/contact.model'

const newContact = (userName: string): Contact => {
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

export default newContact; 