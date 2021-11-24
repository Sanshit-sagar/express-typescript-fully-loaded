import login from "./login";
import signup from "./signup";
import resetPasswrod from "./resetPassword";
import setAuthenticationCookie from "./setAuthenticationCookie";
import unsetAuthenticationCookie from "./unsetAuthenticationCookie";
import getExistingUserByEmail from "./getExistingUserByEmail";
import getExistingUserByEmailPassword from "./getExistingUserByEmailPassword";
import generateResetToken from "./generateResetToken";

export default {
    login,
    signup,
    resetPasswrod,
    setAuthenticationCookie,
    unsetAuthenticationCookie
}; 

