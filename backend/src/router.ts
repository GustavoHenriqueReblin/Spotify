import express from "express";

import { userByLogin, userByToken, userById } from "./controllers/userController";
import { authenticateToken } from "./middlewares/userMiddleware";
import { library } from "./controllers/libraryController";
const router = express.Router();

router.post("/login", userByLogin);
router.get("/userByToken/:token", userByToken);
router.get("/user/:id", userById);

router.get("/library/:idUser", authenticateToken, library);

export default router;