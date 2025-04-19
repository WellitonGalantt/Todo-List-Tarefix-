# Projeto todo list Tarefix

## 🌟 Sobre o Projeto

Tarefix é um sistema backend desenvolvido para fins de estudos e desafio pessoal focado em backend, o objetivo do sistema é poder gerenciar e organizar tarefas pessoais;

## 🛠️ Tecnologias Utilizadas

* NodeJS : Ambiente para execução de javascript para backend;
* Typescript : Linguagem de programação tipada com base em javascript;
* Express : Framework para criações de APIs;
* PostrgreSQL : Banco de dados relacional;
* Jsonwebtoken : Biblioteca usada para autenticação segura;
* Bcrypt : Biblioteca para criptografia de senha em hash;
* knex : Biblioteca para comunicação com banco de dados(ORM);
* Yup : Biblioteca para criação e validação de schemas;

## ⚙️ Funcionalidades Principais

* Cadastro de usuario: O usuario podera se cadastrar no sistema usando um nome email e senha, gerando entao uma criptografia da senha e salvando no banco de dados;
* Login de usuario: O usuario devera se logar no sistema para poder ter acesso as sessoes, passando seu email e senha e apos a verificação dos dados gera entao um token de acesso com duracao de 1h;
* Criação de tarefas: O usuario podera registrar um tarefa passando o titulo, descrição, status e categoria retornado o ID da terefa criada;
* Edição de tarefas: O usuario podera atualizar passando o novo titulo, descrição, status e categoria retornando os dados da tarefa editada;
* Exclusao de tarefas: O usuario podera excluir uma tareafa passando o ID da terefa;
* Alteração de status: O usuario podera mudar o status da tarefa concluida ou inconpleta passando o status;
* Alteração de categoria: O usuario podera mudar a categoria da tarefa a categoria;

## 🚀 Como Executar o Projeto

Instruções claras e passo a passo para que alguém possa rodar seu backend localmente. Isso geralmente inclui:

1.  **Pré-requisitos:**
    * É necessario ter o NodeJS, PostgreSQL instalado na maquina para poder rodar o projeto local.
2.  **Instalação:**
    * Comandos para clonar o repositório:
        ```sh
        git clone [https://github.com/WellitonGalantt/Todo-List-Tarefix-]
        cd Todo-List-Tarefix-
        ```
    * Instalação de dependencias:
        ```sh
        npm install.
        ```
3.  **Configuração:**
    * Crie o arqui .env e coloque as configuracoes do banco de dados e a chave para o JWT.
        ```env
        PORT
        DB_HOST
        DB_USER
        DB_PORT
        DB_PASSWORD
        DB
        JWT_SECRET
        ```
4.  **Migrações:**
    * Antes de iniciar o projeto execute as migrações:
    ```sh
    npm run knex:migrate
    ```
5.  **Execução:**
    * Inicialize o servidor:
    ```sh
    npm run dev
    ```
6.  **Endpoints da API :**
    * http://localhost:3333
        * ( POST ) /auth/register : Registro de usuario;
        * ( POST ) /auth/login : Login de usuario e gr acao de token de acesso para autenticação;
        * ( GET ) /tasks : Pegar todas as as tarefas relacionadas ao usuario autenticado;
        * ( GET ) /task/id : Pegar uma unica tarefa relacionada ao usuario passando o id da tarefa;
        * ( POST ) /task : Criação de tarefa;
        * ( PUT ) /tasks/id : Atualizar tarefa passando o id da tarefa;
        * ( PATCH ) /task/id/status : Alterar o status da tarefa passando o id da tarefa;
        * ( PATCH ) /task/id/category : Alterar a categoria da tarefa passando o id da tarefa;
        * ( DELETE ) /tasks/id : Excluindo uma terefa passando o id da tarefa;
        * ( GET ) /status : Pegar todos os status;
        * ( GET ) /category : Pegar todos as categorias;


## 🧪 Testes
    * Nao foram feitos testes automatizados ainda;

## 🛠 Melhorias Futuras
    * Crição de testes automatizados;
    * Front End;
    * Criação/exclusão de status personalizados;
    * Criação/exclusão de categorias personalizadas;
    * Colocar um prazo da tarefa;

## 🏔️ Desafios Que Tive

Fiz esse projeto com intuito de estudar e aprender mais sobre desenvolvimento de apis, tive alguns desafios mas aprendi muitas coisas novas e melhorei meu entendimento no que eu ja sabia ou achava que sabia;
O que eu mais tive dificuldade e tive que ir um pouco mais atras foi sobre a autenticação, entender como funciona o JWT, como é assinado, como ele salva os dados e como acessa o payload;
Fora isso aprendi e desenvolvi melhor alguns aspectos como organização de arquivos e funções do projeto, tipagem dos dados, resposta do servidor com estrutura padronizada, melhorias de codigos e muitas outras coisas;