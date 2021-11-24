/* eslint-disable consistent-return */

import { User } from "../../models/user.model";
import formatError from "../../errors/formatError";

const getUser = (emailAddress = "") => {
  try {
    return User.findOne({ emailAddress });
  } catch (error) {
    throw new Error(formatError("getExistingUserByEmail.getUser", error));
  }
};

const validateOptions = (options) => {
  try {
    if (!options) throw new Error("options object is required.");
    if (!options.emailAddress)
      throw new Error("options.emailAddress is required.");
  } catch (error) {
    throw new Error(
        formatError("getExistingUserByEmail.validateOptions", error)
    );
  }
};

const getExistingUserByEmail = async (options, { resolve, reject }) => {
  try {
    validateOptions(options);

    const user = await getUser(options.emailAddress);

    resolve(user);
  } catch (error) {
    throw new Error(formatError("getExistingUserByEmail", error));
  }
};

export default (options) =>
  new Promise((resolve, reject) => {
    getExistingUserByEmail(options, { resolve, reject });
  });