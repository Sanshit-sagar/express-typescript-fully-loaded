import mongoose from 'mongoose'

interface IPoser {
    firstName: string;
    lastName: string;
};

interface poserModelInterface extends mongoose.Model<IPoser> {
    build(attr: IPoser): IPoser
}