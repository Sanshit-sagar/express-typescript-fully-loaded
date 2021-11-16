import mongoose from 'mongoose'

interface IPoser {
    firstName: string;
    lastName: string;
};

interface PoserModelInterface extends mongoose.Model<IPoser>