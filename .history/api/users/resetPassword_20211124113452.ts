/* eslint-disable consistent-return */

import hashString from "./hashString";
import { User } from "../../models/user.model";
import encryptLoginToken from "./encryptLoginToken";
import formatError from '../../errors/formatError'

import {
    PromiseActions, 
    ExistingUser 
} from './login'

type Options = {
    newPassword?: string;
    repeatNewPassword?: string;
    token: string; 
};

type UserLogin = {
    userId: string;
    emailAddress: string;
    password: string;
}

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
    throw new Error(formatError("resetPassword.addSessionToUser", error));
  }
};

const setNewPasswordOnUser = async (userId = "", password = "") => {
    try {
        const hashedPassword = await hashString(password);

        await User.updateOne({ _id: userId }, {
            $set: { password: hashedPassword },
        });

        return hashedPassword;
    } catch (exception) {
        throw new Error(`[actionName.setNewPasswordOnUser] ${exception.message}`);
    }
};

const getUserWithToken = (token = "") => {
  try {
    return User.findOne({ "passwordResetTokens.token": token });
  } catch (exception) {
    throw new Error(`[resetPassword.getUserWithToken] ${exception.message}`);
  }
};

const validateOptions = (options: Options) => {
  try {
    if (!options) throw new Error("options object is required.");
    if (!options.token) throw new Error("options.token is required.");
    if (!options.newPassword)
      throw new Error("options.newPassword is required.");
    if (!options.repeatNewPassword)
      throw new Error("options.repeatNewPassword is required.");
  } catch (exception) {
    throw new Error(`[resetPassword.validateOptions] ${exception.message}`);
  }
};

const resetPassword = async (options, { resolve, reject }) => {
  try {
    validateOptions(options);

    const user = await getUserWithToken(options.token);

    if (!user) {
        throw new Error("Sorry, that token is invalid. Please try again.");
    }

    if (options.newPassword !== options.repeatNewPassword) {
        throw new Error("Passwords must match. Please double-check your passwords match and try again.");
    }

    const hashedNewPassword = await setNewPasswordOnUser(
        user?._id,
        options.newPassword
    );

    const login: UserLogin = await encryptLoginToken({
        userId: user?._id,
        emailAddress: user?.emailAddress,
        password: hashedNewPassword
    });

    await addSessionToUser(user?._id, login);

    resolve({
        user,
        ...login,
    });

  } catch (exception) {
    reject(`[resetPassword] ${exception.message}`);
  }
};

export default (options) => new Promise((resolve, reject) => {
    return resetPassword(options, { resolve, reject })
});
