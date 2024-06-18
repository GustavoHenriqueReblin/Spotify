import { Request, Response } from 'express';

import { 
    userByLogin as userByLoginModel, 
    userById as userByIdModel, 
    userByToken as userByTokenModel 
} from '../models/userModel';
import { userByLoginSchema } from '../schema';

export interface UserByLoginRequest extends Request {
    body: userByLoginSchema;
};

const userByLogin = async (req: UserByLoginRequest, res: Response) => {
    try {
        const { login, password } = req.body;

        const result = await userByLoginModel(login, password);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(500).json({
                statusCode: 500,
                message: error.message,
            });
        } else {
            res.status(500).json({
                statusCode: 500,
                message: 'Unknown error',
            });
        }
    }
};

const userByToken = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;

        const result = await userByTokenModel(token);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(500).json({
                statusCode: 500,
                message: error.message,
            });
        } else {
            res.status(500).json({
                statusCode: 500,
                message: 'Unknown error',
            });
        }
    }
};

const userById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await userByIdModel(Number(id));
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(500).json({
                statusCode: 500,
                message: error.message,
            });
        } else {
            res.status(500).json({
                statusCode: 500,
                message: 'Unknown error',
            });
        }
    }
};

export { userByLogin, userByToken, userById };