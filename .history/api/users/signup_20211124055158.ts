/* eslint-disable consistent-return */

import {User} from "../../models/user.model";
import hashString from "./hashString";
import encryptLoginToken from "./encryptLoginToken";
import generateId from "../../lib/generateId";
import formatError from "../../errors/formatError";

const addSessionToUser = (userId = null, session = null) => {
  try {
    return User.updateOne(
      {
        _id: userId,
      },
      {
        $addToSet: {
          sessions: session,
        },
      }
    );
  } catch (error) {
    throw new Error(formatError("signup.addSessionToUser", error));
  }
};

const getUserByUserId = (userId = "") => {
  try {
    return User.findOne({ _id: userId });
  } catch (exception) {
    throw new Error(formatError("signup.getUserByUserId", exception));
  }
};

const insertUserInDatabase = async (user = {}) => {
  try {
    const userId = generateId();
    await User.insertOne({ _id: userId, ...user });

    return userId;
  } catch (exception) {
    throw new Error(
        formatError("signup.insertUserInDatabase", exception)
    );
  }
};

const getUserToCreate = async (options = {}) => {
  try {
    return {
      ...options,
      password: await hashString(options.password),
    };
  } catch (exception) {
    throw new Error(formatError("signup.getUserToCreate", exception));
  }
};

const getExistingUser = (emailAddress = "") => {
  try {
    return Users.findOne({ emailAddress });
  } catch (exception) {
    throw new Error(formatError("signup.getExistingUser", exception));
  }
};

const validateOptions = (options) => {
  try {
    if (!options) throw new Error("options object is required.");
    if (!options.emailAddress)
      throw new Error("options.emailAddress is required.");
    if (!options.password) throw new Error("options.password is required.");
  } catch (exception) {
    throw new Error(formatError("signup.validateOptions", exception));
  }
};

const signup = async (options, { resolve, reject }) => {
  try {
    validateOptions(options);

    const existingUser = await getExistingUser(options.emailAddress);

    if (existingUser) {
      throw new Error(
        `A user with the email address ${options.emailAddress} already exists.`
      );
    }

    const userToCreate = await getUserToCreate(options);
    const userId = await insertUserInDatabase(userToCreate);
    const user = await getUserByUserId(userId);

    const login = await encryptLoginToken({
      userId,
      emailAddress: user.emailAddress,
      password: user.password,
    });

    await addSessionToUser(user._id, login);

    return resolve({
      ...login,
      userId,
      user,
    });
  } catch (exception) {
    reject(formatErrorString("signup", exception));
  }
};

export default (options) =>
  new Promise((resolve, reject) => {
    signup(options, { resolve, reject });
  });