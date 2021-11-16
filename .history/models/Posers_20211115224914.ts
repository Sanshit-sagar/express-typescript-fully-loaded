import mongoose from 'mongoose'

interface IPoser {
    firstName: string;
    lastName: string;
};

interface poserModelInterface extends mongoose.Model<PoserDoc> {
    build(attr: IPoser): PoserDoc; 
}

interface PoserDoc extends mongoose.Document {
    
}