import login from "./login";
import signup from "./signup";
import token from "./token";
import resetPasswrod from "./resetPassword";
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
    generateResetToken,
    getExistingUserByEmail,
    setAuthenticationCookie,
    unsetAuthenticationCookie,
    getExistingUserByEmailPassword
}; 

