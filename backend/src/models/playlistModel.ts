import conn from '../conn';
import { Music, Playlist } from "../types";

const playlist = async (id: number): Promise<Playlist[] | []> => {
    const [rows] = await conn.execute(
        "SELECT p.*, u.`name` userName FROM playlist p INNER JOIN `user` u on u.id = p.idUser WHERE p.id = ?", [id]
    );

    const result = rows as Playlist[];
    return result;
};

const playlistMusics = async (idPlaylist: number): Promise<Music[] | []> => {
    const [rows] = await conn.execute(
        "SELECT m.*, a.id idAlbum, a.`name` albumName, mp.addedAt FROM mus_pla mp " +
        "INNER JOIN music m ON m.id = mp.idMusic " +
        "INNER JOIN alb_mus am ON am.idMusic = m.id " +
        "INNER JOIN album a ON a.id = am.idAlbum " +
        "WHERE mp.idPlaylist = ? ", [idPlaylist]
    );

    const result = rows as Music[];
    return result;
};

export { playlist, playlistMusics };
