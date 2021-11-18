import { Schema, model, Document } from 'mongoose'

interface Poser {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string; 
    userName: string; 
}

const 
