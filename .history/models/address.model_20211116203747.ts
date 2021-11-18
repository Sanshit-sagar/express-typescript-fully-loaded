import { Document, Schema, Model, model } from 'mongoose'

type Address = {
    country: string;
    city: string;
    state: string;
    street: string;
    postalCode: string;
    userName: string;
};

type AddressDocument = Document & Address

type AddressInput = {
    country: AddressDocument['country'];
    city: AddressDocument['city'];
    state: AddressDocument['state'];
    street: AddressDocument['street'];
    postalCode: AddressDocument['postalCode'];
    userName: AddressDocument['userName'];
};
  
const addressSchema = new Schema<AddressDocument>({
    country: {
        type: Schema.Types.String,
        required: true,
    },
    city: {
        type: Schema.Types.String,
        required: true,
    },
    state: {
        type: Schema.Types.String,
        required: true,
    },
    street: {
        type: Schema.Types.String,
        required: true,
    },
    postalCode: {
        type: Schema.Types.String,
        required: true,
    },
    userName: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
}, { collection: 'addresses', timestamps: true, usePushEach: true }
);

const AddressModel: Model<AddressDocument> = model('Address', addressSchema); 

export {
    Address,
    AddressModel,
    AddressInput,
    AddressDocument,
}