import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import conn from '../conn';

import { UserByLoginRequest } from "../controllers/userController";
import { User } from "../types";

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({message: "Invalid token."});

    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(401).json({message: "Invalid token."});

    jwt.verify(token, process.env.SECRET_KEY ?? "", async (err) => {
        if (err) return res.status(403).json({message: "Invalid token."});

        const [rows] = await conn.execute("SELECT * FROM user WHERE token = ?", [token]);
        const result = rows as User[];

        if (result.length <= 0) return res.status(403).json({message: "Invalid token."});

        next();
    });
};

const validateUserByLogin = (req: UserByLoginRequest, res: Response, next: NextFunction) => {
    const user = req.body as User;

    if (user.login === undefined) {
        return res.status(400).json({message: "The field 'login' is required."});
    } else if (user.login === "") {
        return res.status(400).json({message: "The field 'login' cannot be empty."});
    } else if (user.password === undefined) {
        return res.status(400).json({message: "The field 'password' is required."});
    } else if (user.password === "") {
        return res.status(400).json({message: "The field 'password' cannot be empty."});
    }

    next();
};

export { authenticateToken, validateUserByLogin };