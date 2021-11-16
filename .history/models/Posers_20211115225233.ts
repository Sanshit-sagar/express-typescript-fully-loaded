import mongoose from 'mongoose'

interface IPoser {
    firstName: string;
    lastName: string;
};

interface poserModelInterface extends mongoose.Model<PoserDoc> {
    build(attr: IPoser): PoserDoc; 
};

interface PoserDoc extends mongoose.Document {
    firstName: string;
    lastName: string; 
};

const poserSchema = new mongoose.Schema({
    firstName: {
        title: String,
        required: true,
    },
    lastName: {
        title: String,
        required: true
    }
});


poserSchema.statics.build = (attr: IPoser) => {
    return new IPoser(att)
}