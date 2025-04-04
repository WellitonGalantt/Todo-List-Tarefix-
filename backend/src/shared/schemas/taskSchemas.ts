import * as yup from 'yup';
import { ICreateTask } from '../types/taskInterfaces';

export const createTaskSchema: yup.ObjectSchema<ICreateTask> = yup.object().shape({
    title: yup.string().required('Título é obrigatório').min(3, 'Título deve ter no mínimo 3 caracteres').max(125, 'Título deve ter no máximo 125 caracteres'),
    description: yup.string().required('Descrição é obrigatória').max(255, 'Descrição deve ter no máximo 255 caracteres'),
    status_id: yup.number().required('Status é obrigatório').positive().integer(),
    category_id: yup.number().required('Categoria é obrigatória').positive().integer()
})