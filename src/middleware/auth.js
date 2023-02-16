import { getTokenFromHeaders, compareToken } from "../utils/util.js";
const auth = (req,res, next) => {
    const { authorization } = req.headers;
    if( !authorization ){
        return res.status(400).json('Un Authorize User');
    }
    const token = getTokenFromHeaders(authorization);
    const userLoggedIn = compareToken(token);
    req.user = userLoggedIn
    next();
}

export default auth;