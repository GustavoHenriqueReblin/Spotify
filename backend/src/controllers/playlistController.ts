import { Request, Response } from 'express';

import { playlistMusics as playlistMusicsModel, playlist as playlistModel, savePlaylist as savePlaylistModel } from '../models/playlistModel';
import { savePlaylsitSchema } from '../schema';

export interface SavePlaylistRequest extends Request {
    body: savePlaylsitSchema;
};

const playlist = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await playlistModel(Number(id));
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

const playlistMusics = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await playlistMusicsModel(Number(id));
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

const savePlaylist = async (req: SavePlaylistRequest, res: Response) => {
    try {
        const { idPlaylist, idLibrary, save } = req.body;

        const result = await savePlaylistModel(idPlaylist, idLibrary, save);
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

export { playlist, playlistMusics, savePlaylist };