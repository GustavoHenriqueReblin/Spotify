export type User = {
    id: number;
    idLastMusic?: number;
    login: string;
    password: string;
    name: string;
    accountLevel?: number;
    token?: string;
    picture: string;
};

export type Playlist = {
    id: number;
    idUser: number;
    name: string;
    picture: number;
    type: string;
    userName?: string;
};

export type Music = {
    id: number;
    name: string;
    duration: number;
    idAlbum: number;
    albumName: string;
    addedAt: Date;
};