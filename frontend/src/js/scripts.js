//http://localhost:3333

let statusList = [];
let categoryList = [];

document.addEventListener("DOMContentLoaded", () => {
  const taskContainerEl = document.querySelector(".task-list");
  const cretaeTaksBtnEl = document.querySelector(".create-task-button");
  const cancelEditBtnEl = document.querySelector(".cancel-button");
  const createTaskModalEl = document.querySelector("#createTaskModal");
  const createTaskFormEl = document.querySelector("#createTaskForm");

  const categorySelectListEl = document.querySelector("#taskCategory");
  const statusSelectListEl = document.querySelector("#taskStatus");

  async function loadAllData() {
    try {
      const statusRes = await fetch("http://localhost:3333/status");
      if (!statusRes.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      statusList = await statusRes.json();

      const categoryRes = await fetch("http://localhost:3333/category");
      if (!categoryRes.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      categoryList = await categoryRes.json();

      getAllTasks();
    } catch (err) {
      console.log("Errro ao carregar os dados " + err);
    }
  }

  function getAllTasks() {
    fetch("http://localhost:3333/tasks", {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const tasks = data.data[0];
        tasks.sort((a, b) => {
          if (a.status_id == 2 && b.status_id == 1) {
            return -1;
          }

          if (a.status_id == 1 && b.status_id == 2) {
            return 1;
          }

          if (a.status_id == 2 && b.status_id == 2) {
            return 0;
          }
        });

        listAllTask(tasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function listAllTask(tasks) {
    taskContainerEl.innerHTML = "";
    tasks.forEach((task) => {
      const status = getTaskStatus(task.status_id);
      const category = getTaskCategory(task.category_id);
      const taskItem = document.createElement("li");
      taskItem.dataset.taskId = task.id;
      taskItem.classList.add("task-item");
      taskItem.innerHTML = `
                <span class="task-title">${task.title}</span>
                <span class="task-categoria" data-category-id="${
                  category.id
                }">${category.name}</span>
                <span class="task-status ${
                  status.name === "Completa" ? "concluida" : "pendente"
                }" data-status-id="${status.id}">${status.name}</span>
                <div class="task-actions-buttons">
                    <button class="concluir-button">Concluir</button>
                    <button class="editar-button">Editar</button>
                    <button class="excluir-button">Excluir</button>
                </div>
            `;
      taskContainerEl.appendChild(taskItem);
    });

    // const allTasks = document.querySelectorAll('.task-item')
    taskContainerEl.addEventListener("click", (e) => {
      const classElClicked = e.target.classList.value;
      const taskBoxElement = e.target.parentNode.parentNode;
      const statusId =
        taskBoxElement.querySelector(".task-status").dataset.statusId;
      const idElClicked = taskBoxElement.dataset.taskId;

      if (classElClicked.includes("concluir-button")) {
        completeTask(idElClicked, statusId);
      }

      if (classElClicked.includes("editar-button")) {
        updateDataOptions();
        if (createTaskFormEl) {
          editTask(idElClicked);
        }
      }

      if (classElClicked.includes("excluir-button")) {
        fetch(`http://localhost:3333/task/${idElClicked}`, { method: "DELETE" })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Erro na requisicao: " + res.status);
            }
            getAllTasks();
            return res.json();
          })
          .then((data) => {
            console.log(data.message);
          })
          .catch((error) => {
            console.error("Erro ao deletar a tarefa:", error);
          });
      }
    });
  }

  if (cretaeTaksBtnEl) {
    cretaeTaksBtnEl.addEventListener("click", () => {
      updateDataOptions();
      createTaskModalEl.style.display = "block";
      if (createTaskFormEl) {
        createTaskFormEl.addEventListener("submit", createTaskFun);
      }
    });
  }

  if (cancelEditBtnEl) {
    cancelEditBtnEl.addEventListener("click", () => {
      createTaskFormEl.reset();
      createTaskModalEl.style.display = "none";
    });
  }

  //Criacao de tarefas
  function createTaskFun(event) {
    event.preventDefault();
    const title = document.getElementById("taskTitle").value.trim();
    const description = document.getElementById("taskDescription").value.trim();
    const categorySelectIndex =
      document.getElementById("taskCategory").selectedIndex;
    const statusSelectIndex =
      document.getElementById("taskStatus").selectedIndex;
    let category_id;
    let status_id;
    // --------------------------
    if (categorySelectIndex !== -1) {
      category_id =
        document.getElementById("taskCategory").options[categorySelectIndex]
          .dataset.categoryId;
    }

    if (statusSelectIndex !== -1) {
      status_id =
        document.getElementById("taskStatus").options[statusSelectIndex].dataset
          .statusId;
    }

    const taskData = { title, description, status_id, category_id };

    fetch("http://localhost:3333/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Indica que o corpo da requisição é JSON
      },
      body: JSON.stringify(taskData),
    })
      .then((res) => {
        if (!res.ok) {
          console.error(`Erro na requisição: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!data.sucess) {
          console.error(`${data.message}\nerror: ${data.error[0]}`);
        } else {
          getAllTasks();
          createTaskModalEl.style.display = "none";
          createTaskFormEl.reset();
          createTaskFormEl.removeEventListener("submit", createTaskFun);
        }
      })
      .catch((error) => {
        console.error("Erro ao criar tarefa:", error);
      });
  }

  let boundEditTaskFun;
  async function editTask(id) {
    createTaskModalEl.style.display = "block";
    const task = await getOneTask(id);
    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskDescription").value = task.description;
    const categorySelect = document.getElementById("taskCategory");
    const statusSelect = document.getElementById("taskStatus");

    if (categorySelect.length > 0) {
      const optionCategory = categorySelect.querySelector(
        `option[data-category-id="${task.category_id}"]`
      );
      if (optionCategory) {
        optionCategory.selected = true;
      }
    }

    if (statusSelect.length > 0) {
      const optionStatus = statusSelect.querySelector(
        `option[data-status-id="${task.status_id}"]`
      );
      if (optionStatus) {
        optionStatus.selected = true;
      }
    }

    boundEditTaskFun = (event) => editTaskFun(event, task.id); // Referencia da funcao para event listener
    createTaskFormEl.addEventListener("submit", boundEditTaskFun);
  }

  function editTaskFun(event, id) {
    event.preventDefault();

    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;
    const categorySelect = document.getElementById("taskCategory");
    const statusSelect = document.getElementById("taskStatus");
    const category_id =
      categorySelect.options[categorySelect.selectedIndex].dataset.categoryId;
    const status_id =
      statusSelect.options[statusSelect.selectedIndex].dataset.statusId;

    const data = { title, description, status_id, category_id };

    fetch(`http://localhost:3333/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          console.error(`Erro na requisicao: ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        if (!data.sucess) {
          console.error(`${data.message}\nerror: ${data.error[0]}`);
        } else {
          getAllTasks();
          createTaskModalEl.style.display = "none";
          createTaskFormEl.reset();
          createTaskFormEl.removeEventListener("submit", boundEditTaskFun);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function completeTask(id, statusId) {
    let status_id;
    if (statusId == 1) {
      status_id = 2;
    } else if (statusId == 2) {
      status_id = 1;
    }

    fetch(`http://localhost:3333/task/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status_id }),
    })
      .then((res) => {
        if (!res.ok) {
          console.error(`Erro na requisição: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!data.sucess) {
          console.error(`${data.message}\nerror: ${data.error[0]}`);
        } else {
          loadAllData();
        }
        // console.log(data.message)
      });
  }

  function getTaskStatus(id) {
    return statusList.data[0].find((e) => {
      const idStatus = Number(e.id);
      return idStatus === id;
    });
  }

  function getTaskCategory(id) {
    return categoryList.data[0].find((e) => {
      const idCategory = Number(e.id);
      return idCategory === id;
    });
  }

  async function getOneTask(id) {
    return await fetch(`http://localhost:3333/task/${id}`)
      .then((res) => {
        if (!res.ok) {
          console.warn(`Erro na requisicao: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // console.info(data.message)
        return data.data[0];
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function updateDataOptions() {
    statusSelectListEl.innerHTML = "";
    categorySelectListEl.innerHTML = "";

    statusList.data[0].forEach((e) => {
      const option = document.createElement("option");
      option.value = e.name.toLowerCase();
      option.text = e.name;
      option.dataset.statusId = e.id;
      statusSelectListEl.appendChild(option);
    });

    categoryList.data[0].forEach((e) => {
      const option = document.createElement("option");
      option.value = e.name.toLowerCase();
      option.text = e.name;
      option.dataset.categoryId = e.id;
      categorySelectListEl.appendChild(option);
    });
  }

  loadAllData();
});
