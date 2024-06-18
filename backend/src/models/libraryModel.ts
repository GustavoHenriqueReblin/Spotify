import conn from '../conn';
import { Playlist } from "../types";

const library = async (idUser: number): Promise<Playlist[] | []> => {
    const [rows] = await conn.execute(
        "SELECT p.*, u.`name` userName FROM library l " +
        "INNER JOIN lib_pla lp ON lp.idLibrary = l.id " +
        "INNER JOIN playlist p ON p.id = lp.idPlaylist " +
        "INNER JOIN `user` u ON u.id = l.idUser " +
        "WHERE l.idUser = ? ", [idUser]
    );

    const result = rows as Playlist[];
    return result;
};

export { library };
