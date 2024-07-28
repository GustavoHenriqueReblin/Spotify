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
    name: string;
    picture: string;
    type: string;
    likes: number;
    playlistCreator: {
        id: number;
        name: string;
        picture: string;
    };
};

export type Music = {
    id: number;
    name: string;
    duration: number;
    src: string;
    idAlbum: number;
    albumName: string;
    addedAt: Date;
};

export type Library = {
    id: number;
    idUser: number;
    playlists: Playlist[];
};

export type DefaultResponse = {
    error: boolean;
    message: string;
};