import express from 'express';
import { router } from './routes/routes';
import cors from 'cors';

const app = express();

const corsConfig = {
    origin: 'http://localhost:3333',
}

app.use(cors());// Permite que o frontend acesse o backend

app.use(express.json());

app.use(router);

app.listen(process.env.PORT || 3333, ()=>{
    console.log("Server rodando em http://localhost:3333")
})