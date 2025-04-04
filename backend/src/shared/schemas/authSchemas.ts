//scheams sao verificacoes ja prontas que podemos usar em varios lugares para validacoes
import * as yup from 'yup';
import { IUserRegister } from '../types/userInterfaces';

export const userSchema: yup.ObjectSchema<IUserRegister> = yup.object().shape({
    id: yup.number().optional(),
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    password: yup.string().required('Senha é obrigatória'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Senhas não conferem').required('Confirmação de senha é obrigatória')
})