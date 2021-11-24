
import bcrypt from "bcrypt";
import encryptLoginToken from "./encryptLoginToken";
import getExistingUserByEmail from "./getExistingUserByEmail";
import formatError from "../../errors/formatError";



import { User } from "../../models/user.model";

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
    throw new Error(formatError("login.addSessionToUser", error));
  }
};

const checkIfValidPassword = (
  passwordFromLogin = null,
  passwordHashFromUser = null
) => {
  try {
    if (!passwordFromLogin || !passwordHashFromUser) return false;
    return bcrypt.compare(passwordFromLogin, passwordHashFromUser);
  } catch (error) {
    throw new Error(formatError("login.checkIfValidPassword", error));
  }
};

const validateOptions = (options) => {
  try {
    if (!options) throw new Error("options object is required.");
    if (!options.emailAddress)
      throw new Error("options.emailAddress is required.");
    if (!options.password) throw new Error("options.password is required.");
  } catch (error) {
    throw new Error(formatError("login.validateOptions", error));
  }
};

const login = async (options, { resolve, reject }) => {
  try {
    validateOptions(options);

    const existingUser = await getExistingUserByEmail({
      emailAddress: options.emailAddress,
    });

    if (!existingUser) {
      return reject(
        `A user with the email address ${options.emailAddress} could not be found.`
      );
    }

    const isValidPassword = await checkIfValidPassword(
      options.password,
      existingUser.password
    );

    if (!isValidPassword) {
      return reject("Incorrect password.");
    }

    const login = await encryptLoginToken({
      userId: existingUser._id,
      emailAddress: options.emailAddress,
      password: existingUser.password,
    });

    await addSessionToUser(existingUser._id, login);
    const { password, sessions, ...restOfExistingUser } = existingUser;

    return resolve({
      ...login,
      user: {
        ...restOfExistingUser,
      },
    });
  } catch (error) {
    reject(formatError("login", error));
  }
};

export default (options) =>
  new Promise((resolve, reject) => {
    login(options, { resolve, reject });
  });