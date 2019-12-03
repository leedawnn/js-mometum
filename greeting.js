const form = document.querySelector(".js-form");
const toDoForm_greet = document.querySelector(".js-toDoForm");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function paintToDoForm() {
  toDoForm_greet.classList.add(SHOWING_CN);
}

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  saveName(currentValue);
  paintGreeting(currentValue);
  paintToDoForm();
}

function paintNameAskForm() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}
function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}
function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    paintNameAskForm();
  } else {
    paintGreeting(currentUser);
    paintToDoForm();
  }
}

function init() {
  loadName();
}
init();