import { Request, Response } from 'express';

import { library as libraryModel } from '../models/libraryModel';

const library = async (req: Request, res: Response) => {
    try {
        const { idUser } = req.params;

        const result = await libraryModel(Number(idUser));
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

export { library };