import { Router } from "express";
import { AuthController } from "../controllers/AuthControllers";
import { Middlewares } from "../middlewares/Middlewares";
import { userSchema } from "../shared/schemas/authSchemas";
import { createTaskSchema } from "../shared/schemas/taskSchemas";
import { TaskControllers } from "../controllers/TaskControllers";
import { StatusControllers } from "../controllers/StatusControllers";
import { CategoryControllers } from "../controllers/CategoryControllers";

const router = Router();

//Autenticacao
router.post('/auth/login',
    (req, res) => AuthController.postLogin(req, res)
);

router.post('/auth/register',
    Middlewares.validateSchema(userSchema),
    (req, res) => AuthController.postRegister(req, res)
)

//Ver todas as tarefas
router.get('/tasks',
    (req, res) => TaskControllers.getAllTasks(req, res)
)

//Ver tarefa por id
router.get('/task/:id',
    (req, res) => TaskControllers.getTaskById(req, res)
)

//criar tarefas
router.post('/task',
    Middlewares.validateSchema(createTaskSchema),
    (req, res) => TaskControllers.createTask(req, res)
)

//atualizar tarefas
router.put('/task/:id',
    (req, res) => TaskControllers.updateTask(req, res)
)

router.patch('/task/:id/status',
    (req, res) => TaskControllers.completeTask(req, res)
)

router.patch('/task/:id/category',
    (req, res) => TaskControllers.switchCategory(req, res)
)

router.delete('/task/:id',
    (req, res) => TaskControllers.deleteTaskById(req, res)
)

// Rotas de status e categorias

router.get('/status',
    (req, res) => StatusControllers.getAllStatus(req, res)
)

router.get('/category',
    (req, res) => CategoryControllers.getAllCategories(req, res)
)

export { router };

