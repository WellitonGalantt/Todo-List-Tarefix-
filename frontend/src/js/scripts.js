//http://localhost:3333

document.addEventListener('DOMContentLoaded', () => {
    const taskContainerEl = document.querySelector('.task-list')
    const cretaeTaksBtnEl = document.querySelector('.create-task-button')
    const cancelEditBtnEl = document.querySelector('.cancel-button')
    const createTaskModalEl = document.querySelector('#createTaskModal')
    const createTaskFormEl = document.querySelector('.createTaskForm')


    function getAllTasks() {
        fetch('http://localhost:3333/tasks', {
            method: 'GET'}
            )
        .then(res => {
            if(!res.ok) {
                throw new Error(`Erro na requisição: ${response.status}`)
            }
            return res.json()
        })
        .then(data =>{
            listAllTask(data.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    if(cretaeTaksBtnEl){
        cretaeTaksBtnEl.addEventListener('click', () => {
            createTaskModalEl.style.display = "block"
        })
    }

    if(cancelEditBtnEl){
        cancelEditBtnEl.addEventListener('click', () => {
            createTaskModalEl.style.display = "none"
        })
    }
    
    if (createTaskFormEl) {
        createTaskFormEl.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário
            const title = document.getElementById('taskTitle').value;
            const description = document.getElementById('taskDescription').value;
            const category = document.getElementById('taskCategory').value;
            const status = document.getElementById('taskStatus').value;

            // Envie esses dados para o seu backend usando fetch (como nos exemplos anteriores)
            console.log('Dados da nova tarefa:', { title, description, category, status });

            fetch

            // Após salvar, você pode fechar o modal e recarregar a lista de tarefas
            createTaskModalEl.style.display = "none";
            // carregarTarefas(); // Se você tiver essa função para atualizar a lista
        });
    }

    function listAllTask(tasks){
        tasks[0].forEach(task => {
            const taskItem = document.createElement('li')
            taskItem.dataset.taskId = task.id
            taskItem.classList.add('task-item')
            taskItem.innerHTML = `
                <span class="task-title">${task.title}</span>
                <span class="task-status pendente">Pendente</span>
                <div class="task-actions-buttons">
                    <button class="concluir-button">Concluir</button>
                    <button class="editar-button">Editar</button>
                    <button class="excluir-button">Excluir</button>
                </div>
            `
            taskContainerEl.appendChild(taskItem)
        })
    }


    getAllTasks()
})
