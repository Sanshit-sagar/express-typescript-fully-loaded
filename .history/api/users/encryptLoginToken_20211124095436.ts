/* eslint-disable consistent-return */

import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import formatError from "../../errors/formatError";
import settings from "../../lib/settings";

const validateOptions = (options) => {
  try {
    if (!options) throw new Error("options object is required.");
    if (!options.userId) throw new Error("options.userId is required.");
    if (!options.emailAddress) throw new Error("options.emailAddress is required.");
    if (!options.password) throw new Error("options.password is required.");
    
  } catch (error) {
    throw new Error(formatError("encryptLoginToken.validateOptions", error));
  }
};

const encryptLoginToken = (options, { resolve, reject }) => {
  try {
    validateOptions(options);

    const token = jwt.sign({ ...options }, settings.authentication.token, {
      expiresIn: "30 days",
    });

    resolve({
      token,
      tokenExpiresAt: dayjs().add(30, "days").format(),
    });
  } catch (error) {
    reject(formatError("encryptLoginToken", error));
  }
};

export default (options) =>
  new Promise((resolve, reject) => {
    encryptLoginToken(options, { resolve, reject });
  });