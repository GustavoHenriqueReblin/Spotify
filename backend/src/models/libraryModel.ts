import { RowDataPacket } from 'mysql2';
import conn from '../conn';
import { Library } from "../types";

const library = async (idUser: number): Promise<Library | {}> => {
    const [rows] = await conn.execute<RowDataPacket[]>(
        "SELECT l.id, l.idUser, " +
        "JSON_ARRAYAGG(JSON_OBJECT('id', p.id, 'idUser', p.idUser, 'name', p.`name`, 'picture', p.picture, 'type', p.`type`)) playlists " +
        "FROM library l " +
        "INNER JOIN lib_pla lp ON lp.idLibrary = l.id " +
        "INNER JOIN playlist p ON p.id = lp.idPlaylist " +
        "INNER JOIN `user` u ON u.id = l.idUser " +
        "WHERE l.idUser = ? GROUP BY l.id", [idUser]
    );

    if (rows.length === 0) return {};
    return rows[0];
};

export { library };
