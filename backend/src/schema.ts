export interface userByLoginSchema {
    login: string;
    password: string;
};

export interface savePlaylsitSchema {
    idPlaylist: number;
    idLibrary: number;
    save: boolean;
};