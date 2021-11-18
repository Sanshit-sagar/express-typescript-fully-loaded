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
  