
import bcrypt from "bcrypt";
import runUserQuery from "./runUserQuery";
import generateSession from "./generateSession";
import formatError from "../../errors/formatError";

const addSessionToUser = (userId = null, session = null) => {
  try {
    return runUserQuery("addSession", { userId, session });
  } catch (error) {
    throw new Error(formatError("login.addSessionToUser", error));
  }
};

const checkIfValidPassword = (
  passwordFromLogin = null,
  passwordHashFromUser = null
) => {
  try {
    return bcrypt.compareSync(passwordFromLogin, passwordHashFromUser);
  } catch (error) {
    throw new Error(formatError("login.checkIfValidPassword", error));
  }
};

const login = async (options, { resolve, reject }) => {
  try {
    const user = await runUserQuery("user", {
      emailAddress: options.emailAddress,
      username: options.username,
    });

    if (!user) {
      throw new Error(
        `A user with the ${
          options.emailAddress ? "email address" : "username"
        } ${options.emailAddress || options.username} could not be found.`
      );
    }

    const isValidPassword = checkIfValidPassword(
      options.password,
      user.password
    );

    if (!isValidPassword) {
      return reject("Incorrect password.");
    }

    const session = await generateSession();

    await addSessionToUser(user._id, session);
    const { password, sessions, ...restOfUser } = user;

    return resolve({
      ...session,
      user: {
        ...restOfUser,
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