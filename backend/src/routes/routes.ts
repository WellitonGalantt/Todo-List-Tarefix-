import { Router } from "express";
import { AuthController } from "../controllers/AuthControllers";
import { AuthMiddlewares } from "../middlewares/authMiddlewares";
import { userSchema } from "../shared/schemas";

const router = Router();

router.post('/login',
    (req, res) => AuthController.postLogin(req, res)
);

router.post("/register",
    AuthMiddlewares.validateSchema(userSchema),
    (req, res) => AuthController.postRegister(req, res)
)

export { router };

