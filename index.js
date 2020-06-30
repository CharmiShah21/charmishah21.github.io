const ul = document.getElementById("todo-list");
const input = document.getElementById("add-todo-input");

function deleteTodo(e) {
  const currentLi = e.target.parentNode;
  currentLi.remove();
}

function onTodoComplete(e) {
  const currentCheckBox = e.target;
  currentCheckBox.checked = true;
  currentCheckBox.nextElementSibling.classList.add("completed");

  const copyOfcurrentTodo = currentCheckBox.parentNode.cloneNode(true);
  copyOfcurrentTodo.children[0].onclick = onTodoComplete;
  copyOfcurrentTodo.children[2].onclick = deleteTodo;

  ul.removeChild(currentCheckBox.parentNode);
  ul.appendChild(copyOfcurrentTodo);

  const audio = new Audio("./ding.wav");
  audio.play();
}

function createNewTodo() {
  if (input.value === "") {
    return alert("Please add todo value");
  }

  const li = document.createElement("li");
  li.classList.add("todo-container__list");

  const todoName = document.createElement("p");
  todoName.classList.add("todo-name");

  const todoDelete = document.createElement("button");
  todoDelete.classList.add("todo-delete-button");
  todoDelete.innerText = "Delete ";
  todoDelete.onclick = deleteTodo;

  const checkbox = document.createElement("input");
  checkbox.classList.add("todo-checkbox");
  checkbox.setAttribute("type", "checkbox");
  checkbox.onclick = onTodoComplete;

  todoName.innerText = input.value;
  li.appendChild(checkbox);
  li.appendChild(todoName);
  li.appendChild(todoDelete);

  ul.appendChild(li);
  input.value = "";
}

const addTodoButton = document.getElementById("add-todo-button");
addTodoButton.onclick = createNewTodo;
