/* eslint-disable consistent-return */

import bcrypt from "bcrypt";
import { User } from "../../models/user.model";
import formatError from "../../errors/formatError";

import getExistingUserByEmail from "./getExistingUserByEmail";
import encryptLoginToken from "./encryptLoginToken";

const addSessionToUser = (userId = null, session = null) => {
  try {
    return User.updateOne({
        _id: userId,
    }, {
        $addToSet: {
            sessions: session,
        },
    });
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
    if (!options.emailAddress) throw new Error("options.emailAddress is required.");
    if (!options.password) throw new Error("options.password is required.");
  } catch (error) {
    throw new Error(formatError("login.validateOptions", error));
  }
};

type PromiseActions = {
    resolve: (unresolved?: any | null) => void;
    reject: (rejected?: any | null) => void; 
}

export type Options = {
    emailAddress?: string;
    password?: string; 
}

export type ExistingUser = {
    _id?: string;
    password?: string; 
    sessions?: any[];  
} | null; 

const login = async (options: Options, { resolve, reject }: PromiseActions) => {
    try {
        validateOptions(options);

        const existingUser: ExistingUser = await getExistingUserByEmail({
            emailAddress: options.emailAddress,
        });

        if (!existingUser) {
            return reject(`Coundn't locate user with email: ${options.emailAddress}`);
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
                ...restOfExistingUser 
            }
        });
    } catch (error: any) {
        return reject(formatError("login", error));
    }
};

export default (options) => new Promise((resolve, reject) => (
    login(options, { resolve, reject })
));