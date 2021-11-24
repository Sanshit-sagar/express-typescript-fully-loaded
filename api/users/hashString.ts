import bcrypt from "bcrypt";

export default (string) => {
    return bcrypt.hash(string, 10);
};