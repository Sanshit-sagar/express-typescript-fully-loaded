import login from "./login";
import signup from "./signup";
import token from "./token";
import resetPasswrod from "./resetPassword";
import setAuthenticationCookie from "./setAuthenticationCookie";
import unsetAuthenticationCookie from "./unsetAuthenticationCookie";
import getExistingUserByEmail from "./getExistingUserByEmail";
import getExistingUserByEmailPassword from "./getExistingUserByEmailPassword";
import generateResetToken from "./generateResetToken";
import encryptLoginToken from "./encryptLoginToken";
import decryptLoginToken from "./decryptLoginToken";
import validateLoginToken from "./validateLoginToken";

export default {
    login,
    signup,
    token,
    resetPasswrod,
    encryptLoginToken,
    decryptLoginToken,
    validateLoginToken,
    getExistingUserByEmail,
    setAuthenticationCookie,
    unsetAuthenticationCookie,
    getExistingUserByEmailPassword
}; 

