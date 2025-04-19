import { Router } from "express";
import { AuthController } from "../controllers/AuthControllers";
import { Middlewares } from "../middlewares/Middlewares";
import { registerSchema, loginSchema } from "../shared/schemas/authSchemas";
import { createTaskSchema } from "../shared/schemas/taskSchemas";
import { TaskControllers } from "../controllers/TaskControllers";
import { StatusControllers } from "../controllers/StatusControllers";
import { CategoryControllers } from "../controllers/CategoryControllers";

const router = Router();

//Autenticacao
router.post('/auth/login',
    Middlewares.validateSchema(loginSchema),
    (req, res) => AuthController.loginUser(req, res)
);

router.post('/auth/register',
    Middlewares.validateSchema(registerSchema),
    (req, res) => AuthController.registerUser(req, res)
)

//Ver todas as tarefas
router.get('/tasks',
    Middlewares.authValidate,
    (req, res) => TaskControllers.getAllTasks(req, res)
)

//Ver tarefa por id
router.get('/task/:id',
    Middlewares.authValidate,
    (req, res) => TaskControllers.getTaskById(req, res)
)

//criar tarefas
router.post('/task',
    Middlewares.authValidate,
    Middlewares.validateSchema(createTaskSchema),
    (req, res) => TaskControllers.createTask(req, res)
)

//atualizar tarefas
router.put('/task/:id',
    Middlewares.authValidate,
    (req, res) => TaskControllers.updateTask(req, res)
)

router.patch('/task/:id/status',
    Middlewares.authValidate,
    (req, res) => TaskControllers.completeTask(req, res)
)

router.patch('/task/:id/category',
    Middlewares.authValidate,
    (req, res) => TaskControllers.switchCategory(req, res)
)

router.delete('/task/:id',
    Middlewares.authValidate,
    (req, res) => TaskControllers.deleteTaskById(req, res)
)

// Rotas de status e categorias

router.get('/status',
    Middlewares.authValidate,
    (req, res) => StatusControllers.getAllStatus(req, res)
)

router.get('/category',
    Middlewares.authValidate,
    (req, res) => CategoryControllers.getAllCategories(req, res)
)

export { router };

