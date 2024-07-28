import express from "express";

import { userByLogin, userByToken, userById } from "./controllers/userController";
import { authenticateToken } from "./middlewares/userMiddleware";
import { library } from "./controllers/libraryController";
import { playlist, playlistMusics } from "./controllers/playlistController";
import { savePlaylist } from "./controllers/playlistController";
const router = express.Router();

router.post("/login", userByLogin);
router.get("/userByToken/:token", userByToken);
router.get("/user/:id", userById);

router.get("/library/:idUser", authenticateToken, library);

router.get("/playlist/:id", authenticateToken, playlist);
router.get("/playlist/:id/musics", authenticateToken, playlistMusics);

router.post("/savePlaylist", savePlaylist);

export default router;