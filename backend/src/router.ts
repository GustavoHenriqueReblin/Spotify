import express from "express";

import { userByLogin, userByToken, userById } from "./controllers/userController";
import { authenticateToken } from "./middlewares/userMiddleware";
const router = express.Router();

router.get("/login", userByLogin);
router.get("/userByToken/:token", userByToken);
router.get("/user/:id", userById);

// Exemplo de rota protegida
router.get('/protected', authenticateToken, (res: any) => {
    res.json({ message: 'This is a protected route' });
});

export default router;