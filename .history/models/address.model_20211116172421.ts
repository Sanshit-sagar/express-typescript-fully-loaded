import { Document, Schema, Model, model } from 'mongoose'

type Address = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    country: string;
    city: string;
    state: string;
    street: string;
    postalCode: string;
    user: string;
};

type AddressDocument = Document & Address
  
const addressSchema = new Schema(
    {
      firstName: {
        type: Schema.Types.String,
        required: true,
      },
      lastName: {
        type: Schema.Types.String,
        required: true,
      },
      phoneNumber: {
        type: Schema.Types.String,
        required: true,
      },
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
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
      },
    },
    {
      collection: 'store_addresses',
      timestamps: true,
});