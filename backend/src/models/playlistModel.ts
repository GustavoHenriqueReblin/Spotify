import { OkPacket, ResultSetHeader } from 'mysql2';
import conn from '../conn';
import { DefaultResponse, Music, Playlist } from "../types";

const playlist = async (id: number): Promise<Playlist[] | []> => {
    const [rows] = await conn.execute(
        "SELECT p.id, p.`name`, p.picture, p.`type`, (SELECT COUNT(*) FROM lib_pla WHERE idPlaylist = 3) likes, " +
        "JSON_OBJECT('id', u.id, 'picture', u.picture, 'name', u.`name`) AS `playlistCreator`" +
        "FROM playlist p " +
        "INNER JOIN `user` u on u.id = p.idUser " +
        "WHERE p.id = ?", [id]
    );

    const result = rows as Playlist[];
    return result;
};

const playlistMusics = async (idPlaylist: number): Promise<Music[] | []> => {
    const [rows] = await conn.execute(
        "SELECT m.*, a.id idAlbum, a.`name` albumName, mp.addedAt, " +
        "JSON_ARRAYAGG(JSON_OBJECT('id', ar.id, 'fullName', CONCAT(IFNULL(ar.firstName, ''), IFNULL(' ' + ar.lastName, '')))) AS artists " +
        "FROM mus_pla mp " +
        "INNER JOIN music m ON m.id = mp.idMusic " +
        "LEFT JOIN art_mus arm ON arm.idMusic = m.id " +
        "LEFT JOIN artist ar ON ar.id = arm.idArtist " +
        "INNER JOIN alb_mus am ON am.idMusic = m.id " +
        "INNER JOIN album a ON a.id = am.idAlbum " +
        "WHERE mp.idPlaylist = ? GROUP BY m.id, a.id, a.name, mp.addedAt", [idPlaylist]
    );

    const result = rows as Music[];
    return result;
};

const savePlaylist = async (idPlaylist: number, idLibrary: number, save: boolean): Promise<DefaultResponse> => {
    const query = save 
        ? "INSERT INTO lib_pla (idLibrary, idPlaylist) VALUES (?, ?) ON DUPLICATE KEY UPDATE idLibrary = VALUES(idLibrary), idPlaylist = VALUES(idPlaylist)"
        : "DELETE FROM lib_pla WHERE idLibrary = ? AND idPlaylist = ?";
    
    const [result] = await conn.execute<ResultSetHeader>(query, [idLibrary, idPlaylist]);

    if (result.affectedRows !== undefined) {
        return {
            error: false, 
            message: `Playlist ${save ? "salva" : "removida"} com sucesso`
        };
    }

    return {
        error: true, 
        message: "Não foi possível salvar a playlist"
    };
};

export { playlist, playlistMusics, savePlaylist };
