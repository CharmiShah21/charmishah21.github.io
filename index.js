const ul = document.getElementById("todo-list");
const input = document.getElementById("add-todo-input");
let draggedLi;

function attachEventListeners(element) {
  element.addEventListener("dragstart", dragStart, false);
  element.addEventListener("dragenter", dragEnter, false);
  element.addEventListener("dragover", dragOver, false);
  element.addEventListener("dragleave", dragLeave, false);
  element.addEventListener("drop", dragDrop, false);
  element.addEventListener("dragend", dragEnd, false);

  element.children[0].onclick = onTodoComplete;
  element.children[2].onclick = onTodoDelete;
}

/**
 * This is a helper function to delete todo
 * @param {Event} e
 */
function onTodoDelete(e) {
  const currentLi = e.target.parentNode;
  currentLi.remove();
}

/**
 * This is a helper function to complete todo
 * @param {*} e
 */
function onTodoComplete(e) {
  const currentCheckBox = e.target;
  currentCheckBox.checked = true;
  currentCheckBox.nextElementSibling.classList.add("completed");

  const copyOfcurrentTodo = currentCheckBox.parentNode.cloneNode(true);
  copyOfcurrentTodo.children[0].onclick = onTodoComplete;
  copyOfcurrentTodo.children[2].onclick = onTodoDelete;

  copyOfcurrentTodo.addEventListener("dragstart", dragStart, false);
  copyOfcurrentTodo.addEventListener("dragenter", dragEnter, false);
  copyOfcurrentTodo.addEventListener("dragover", dragOver, false);
  copyOfcurrentTodo.addEventListener("dragleave", dragLeave, false);
  copyOfcurrentTodo.addEventListener("drop", dragDrop, false);
  copyOfcurrentTodo.addEventListener("dragend", dragEnd, false);

  ul.removeChild(currentCheckBox.parentNode);
  ul.appendChild(copyOfcurrentTodo);

  const audio = new Audio("./ding.wav");
  audio.play();
}

function dragStart(e) {
  this.style.opacity = "0.5";
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
  draggedLi = this;
}

function dragEnter(e) {
  this.classList.add("over");
}

function dragLeave(e) {
  e.stopPropagation();
  this.classList.remove("over");
}

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  return false;
}

function dragDrop(e) {
  if (draggedLi != this) {
    draggedLi.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
  }

  let listItems = document.querySelectorAll(".todo-container__list");
  [].forEach.call(listItems, function (item) {
    if (item.children[0].tagName === "META") {
      item.children[0].remove();
    }
    attachEventListeners(item);
  });

  return false;
}

function dragEnd(e) {
  let listItems = document.querySelectorAll(".todo-container__list");
  [].forEach.call(listItems, function (item) {
    item.classList.remove("over");
  });
  this.style.opacity = "1";
}

/**
 *
 * @param {String} text todo value
 * @param {Function} onDelete todo delete function
 * @param {Function} onComplete todo complete function
 */
function createTodoItem(text, onDelete, onComplete) {
  this.onDelete = onDelete;
  this.onComplete = onComplete;

  this.checked = false;

  let li = document.createElement("li");
  li.classList.add("todo-container__list");

  const todoName = document.createElement("p");
  todoName.classList.add("todo-name");

  const todoDelete = document.createElement("button");
  todoDelete.classList.add("todo-delete-button");
  todoDelete.innerText = "Delete ";
  todoDelete.onclick = this.onDelete;

  const checkbox = document.createElement("input");
  checkbox.classList.add("todo-checkbox");
  checkbox.setAttribute("type", "checkbox");
  checkbox.onclick = this.onComplete;

  todoName.innerText = text;
  li.appendChild(checkbox);
  li.appendChild(todoName);
  li.appendChild(todoDelete);

  li.draggable = "true";
  attachEventListeners(li);

  return li;
}

function createNewTodo() {
  if (input.value === "") {
    return alert("Please add todo value");
  }
  const todoItem = createTodoItem(input.value, onTodoDelete, onTodoComplete);
  countTodoCreated();
  ul.appendChild(todoItem);
  input.value = "";
}

function countTodoCreated() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.countapi.xyz/hit/charmishah21/todos");
  xhr.responseType = "json";
  xhr.onload = function () {
    document.getElementById(
      "todo-count"
    ).innerHTML = `(Total todos created untill now - ${this.response.value})`;
  };
  xhr.send();
}

const addTodoButton = document.getElementById("add-todo-button");
addTodoButton.onclick = createNewTodo;

// Added enter to add todo
document
  .getElementById("add-todo-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      createNewTodo();
    }
  });
