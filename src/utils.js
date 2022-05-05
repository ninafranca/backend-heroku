import {fileURLToPath} from "url";
import {dirname} from "path";
import bcrypt from "bcrypt";

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

export const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const validPassword = (user, password) => bcrypt.compareSync(password, user.password);
export const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies["JWT_COOKIE"]
    }
    return token;
}

export default __dirname;