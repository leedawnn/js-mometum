const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
const TODOS_LS = "toDos";

let toDos = [];

function paintToDos() {
  const todoNum = toDoList.childElementCount;
  if (todoNum !== 0) {
    toDoList.classList.add("showing");
  }
}

function removeToDos() {
  const todoNum = toDoList.childElementCount;
  if (todoNum === 0) {
    toDoList.classList.remove("showing");
  }
}

function deleteTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  console.log(li.id);
  toDos = toDos.filter(toDo => {
    return toDo.id !== Number(li.id);
  });
  console.log(toDos);
  saveToDos();
  removeToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function addTodo(text) {
  const toDoObj = {
    text: text,
    id: (() => {
      const toDosLen = toDos.length;
      if (toDosLen === 0) return 1;
      else return toDos[toDosLen - 1].id + 1;
    })()
  };
  toDos.push(toDoObj);
}
function paintTodo(text, id) {
  const li = document.createElement("li");
  const newId = id;
  const delBtn = document.createElement("div");
  delBtn.classList.add("toDo-del-btn");
  delBtn.innerText = "x";
  delBtn.addEventListener("click", deleteTodo);
  const span = document.createElement("span");
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  paintToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  addTodo(currentValue);
  paintTodo(currentValue, toDos[toDos.length - 1].id);
  saveToDos();
  toDoInput.value = "";
}
function loadTodos() {
  const loadedTodos = localStorage.getItem(TODOS_LS);
  if (loadedTodos !== null) {
    const parsedToDos = JSON.parse(loadedTodos);
    parsedToDos.forEach(toDo => {
      toDos.push(toDo);
      paintTodo(toDo.text, toDo.id);
    });
    paintToDos();
  }
}

function init() {
  loadTodos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();