import jwt from "jsonwebtoken";
import conn from '../conn';
import { User } from "../types";
import dotenv from "dotenv";

dotenv.config();

const userByLogin = async (login: string, password: string): Promise<User[] | []> => {
    const [rows] = await conn.execute(
        "SELECT * FROM user WHERE login = ? AND password = SHA1(?) LIMIT 1", [login, password]
    );

    const result = rows as User[];
    if (result.length > 0) {
        const user = result[0];
        const token = jwt.sign({ id: user.id, login: user.login }, process.env.SECRET_KEY ?? "", { expiresIn: '1d' });
        await conn.execute("UPDATE user SET token = ? WHERE id = ? LIMIT 1", [token, user.id]);
    }

    return result;
};

const userByToken = async (token: string): Promise<User[] | []> => {
    const [rows] = await conn.execute(
        "SELECT * FROM user WHERE token = ? LIMIT 1", [token]
    );
    
    const result = rows as User[];
    return result;
};

const userById = async (id: string): Promise<User[] | []> => {
    const [rows] = await conn.execute(
        "SELECT * FROM user WHERE id = ? LIMIT 1", [id]
    );
    
    const result = rows as User[];
    return result;
};

export { userByLogin, userByToken, userById };