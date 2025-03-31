import { Router } from "express";
import { AuthController } from "../controllers/AuthControllers";
import { AuthMiddlewares } from "../middlewares/authMiddlewares";
import { userSchema } from "../shared/schemas";

const router = Router();

//Autenticacao
router.post('/auth/login',
    (req, res) => AuthController.postLogin(req, res)
);

router.post('/auth/register',
    AuthMiddlewares.validateSchema(userSchema),
    (req, res) => AuthController.postRegister(req, res)
)

//Ver todas as tarefas
router.get('/tasks')

router.get('/task/:id')

router.post('/task')

router.put('/task/:id')

router.patch('/task/:id/complete')

router.delete('/task/:id')

export { router };

