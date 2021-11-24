import hashString from "./hashString";
import generateSession from "./generateSession";
import formatErrorString from "../../errors/formatError";
import runUserQuery from "./runUserQuery";
import { isObject } from "../../lib/validation/typeValidators";

const addSessionToUser = (userId = null, session = null) => {
  try {
    return runUserQuery("addSession", { userId, session });
  } catch (error) {
    throw new Error(formatErrorString("signup.addSessionToUser", error));
  }
};

const getUserByUserId = (userId = "") => {
  try {
    return runUserQuery("user", { _id: userId });
  } catch (exception) {
    throw new Error(formatErrorString("signup.getUserByUserId", exception));
  }
};

const insertUserInDatabase = async (user = {}) => {
  try {
    return runUserQuery("createUser", user);
  } catch (exception) {
    throw new Error(
      formatErrorString("signup.insertUserInDatabase", exception)
    );
  }
};

interface UserCreateOptions {
    emailAddress: string;
    passord: string; 
    metadata: string;

}

const getUserToCreate = async (options: UserCreateOptions = defaultUserCreateOptions) => {
  try {
    let user = {
      password: await hashString(options.password),
    };

    if (options?.emailAddress) {
      user.emailAddress = options?.emailAddress;
    }

    if (options?.metadata && isObject(options.metadata)) {
      // NOTE: Put metadata first to avoid overrides of account fields (e.g., passing
      // metadata.password or metadata.emailAddress).

      user = {
        ...options.metadata,
        ...user,
      };
    }

    return user;
  } catch (exception) {
    throw new Error(formatErrorString("signup.getUserToCreate", exception));
  }
};

const getExistingUser = (emailAddress = "", username = "") => {
  try {
    return runUserQuery("existingUser", { emailAddress, username });
  } catch (exception) {
    throw new Error(formatErrorString("signup.getExistingUser", exception));
  }
};

const signup = async (options, { resolve, reject }) => {
  try {
    if (!options.emailAddress) {
      return reject("Email address is required.");
    }

    if (!options.password) {
      return reject("Password is required.");
    }

    const existingUser = await getExistingUser(
      options.emailAddress,
      options.metadata?.username
    );

    if (existingUser) {
      throw new Error(
        `A user with the ${
          existingUser.existingUsername ? "username" : "email address"
        } ${
          existingUser.existingUsername || existingUser.existingEmailAddress
        } already exists.`
      );
    }

    const userToCreate = await getUserToCreate(options);
    const userId = await insertUserInDatabase(userToCreate);
    const user = await getUserByUserId(userId);
    const session = generateSession();

    await addSessionToUser(user._id, session);

    return resolve({
      ...session,
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