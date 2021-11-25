import { User, UserDocument } from '../models/user.model'

import signup from '../api/users/signup'
import setAuthenticationCookie from "../api/users/setAuthenticationCookie";

const signupUser = (req: Request, res: Response, next: NextFunction) => {
    const  = req.body; 

    return signup({
        email, password
    }).then((response) => {
        const { user, token, tokenExpiresAt } = response;

        setAuthenticationCookie(res, {
            token,
            tokenExpiresAt
        }); 
    })
}



