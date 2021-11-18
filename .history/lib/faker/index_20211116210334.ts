import newPoser from './newPoser'
import newContact from './newContact'
import newAddress from './newAddress'
import { Poser } from '../../models/poser.model'
import { Contact } from '../../models/contact.model'
import { Address } from '../../models/address.model'

type FakeModelName = 'Poser' | 'Contact' | 'Address';

const fakeModelFactory = (modelName: FakeModelName) => {

    switch(modelName) {
        case 'Poser':
            return 
    }
}