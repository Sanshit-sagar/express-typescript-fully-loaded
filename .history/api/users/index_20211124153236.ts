import login from "./login";
import signup from "./signup";
import resetPasswrod from "./resetPassword";

export default {
    login,
    signup,
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

