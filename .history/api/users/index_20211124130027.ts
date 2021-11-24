import login from "./login";
import signup from "./signup";
import token from "./token";
import resetPasswrod from "./resetPassword";
import encryptLoginToken from "./encryptLoginToken";
import decryptLoginToken from "./decryptLoginToken";
import validateLoginToken from "./validateLoginToken";
import getExistingUserByEmail from "./getExistingUserByEmail";
import setAuthenticationCookie from "./setAuthenticationCookie";
import unsetAuthenticationCookie from "./unsetAuthenticationCookie";
import getExistingUserByEmailPassword from "./getExistingUserByEmailPassword";

export default {
    login,
    signup,
    token,
    resetPasswrod,
    encryptLoginToken,
    decryptLoginToken,
    validateLoginToken,
    generateResetToken,
    getExistingUserByEmail,
    setAuthenticationCookie,
    unsetAuthenticationCookie,
    getExistingUserByEmailPassword
}; 

