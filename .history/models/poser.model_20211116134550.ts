import { Schema, model, Document, Model } from 'mongoose'

interface Poser {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string; 
    userName: string; 
}

type PoserDocument = Document & Poser;

type PoserInput = {
    firstName: PoserDocument['firstName'],
    lastName: PoserDocument['lastName'],
    email: PoserDocument[''],
    avatar: ,
    userName: ,
}

const poserSchema = new Schema<PoserDocument>({
    firstName: { type: Schema.Types.String, required: true },
    lastName: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true, unique: true },
    avatar: { type: Schema.Types.String, required: true },
    userName: { type: Schema.Types.String, required: true, index: true, unique: true },
})


const PoserModel: Model<PoserDocument> = model<PoserDocument>('Poser', poserSchema);

export {
    Poser,
    PoserModel,
    PoserDocument
}