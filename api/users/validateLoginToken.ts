/* eslint-disable consistent-return */

import dayjs from "dayjs";
import { User } from "../../models/user.model";
import formatError from "../../errors/formatError";

const checkIfTokenExpiresInFuture = (tokenExpiresAt = "") => {
  try {
    return dayjs().format() < tokenExpiresAt;
  } catch (error) {
    throw new Error(
        formatError("validateLoginToken.checkIfTokenExpiresInFuture", error)
    );
  }
};

const getMatchingSessionFromUser = (user = null, token = "") => {
  try {
    return (
      user &&
      user.sessions &&
      user.sessions.find((loginSession) => loginSession.token === token)
    );
  } catch (error) {
    throw new Error(
        formatError("validateLoginToken.getMatchingSessionFromUser", error)
    );
  }
};

const getUserWithSessionToken = (token = "") => {
  try {
    return User.findOne({ "sessions.token": token });
  } catch (error) {
    throw new Error(
        formatError("validateLoginToken.getUserWithSessionToken", error)
    );
  }
};

const validateOptions = (options) => {
  try {
    if (!options) throw new Error("options object is required.");
    if (!options.token) throw new Error("options.token is required.");
  } catch (error) {
    throw new Error(
        formatError("validateLoginToken.validateOptions", error)
    );
  }
};

const validateLoginToken = async (options, { resolve, reject }) => {
  try {
    validateOptions(options);

    const user = await getUserWithSessionToken(options.token);
    const session = getMatchingSessionFromUser(user, options.token);

    if (!session || !session?.tokenExpiresAt) {
      return reject("Invalid token. Please try again.");
    }

    const expiresInFuture = checkIfTokenExpiresInFuture(session.tokenExpiresAt);

    if (!expiresInFuture) {
      return reject("Expired token. Please log in again.");
    }

    resolve();
  } catch (error) {
    reject(formatError("validateLoginToken", error));
  }
};

export default (options) =>
  new Promise((resolve, reject) => {
    validateLoginToken(options, { resolve, reject });
  });