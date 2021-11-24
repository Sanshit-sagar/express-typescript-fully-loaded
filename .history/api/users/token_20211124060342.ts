/* eslint-disable consistent-return */

import validateLoginToken from "./validateLoginToken";
import decryptLoginToken from "./decryptLoginToken";
import getExistingUserByEmailPassword from "./getExistingUserByEmailPassword";
import formatError from "../../errors/formatError";

const validateOptions = (options) => {
    try {
        if (!options) throw new Error("options object is required.");
        if (!options.token) throw new Error("options.token is required.");
    } catch (error) {
        throw new Error(formatError("token.validateOptions", error));
    }
};

const token = async (options, { resolve, reject }) => {
    try {
        validateOptions(options);

        await validateLoginToken({ token: options.token });

        const decryptedLoginToken = await decryptLoginToken({
            token: options.token,
        });

        const user = await getExistingUserByEmailPassword({
            emailAddress: decryptedLoginToken.emailAddress,
            password: decryptedLoginToken.password,
        });
        resolve(user);
    } catch (exception) {
        resolve({ 
            error: formatError("token", exception) 
        });
    }
};

export default (options) =>
  new Promise((resolve, reject) => {
    token(options, { resolve, reject });
  });