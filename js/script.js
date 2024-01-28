const textTodo = document.querySelector(".itemInput");
const addTodo = document.querySelector(".addButton");
const clearTodo = document.querySelector(".clearButton");
const todosList = document.querySelector(".todoList");
const filterOption = document.querySelector(".filter-todo");

let todosItem = [];
const addTodos = () => {
  let todoValue = textTodo.value;
  let newTodo = {
    id: todosItem.length + 1,
    title: todoValue,
    complete: false,
  };
  textTodo.value = "";
  todosItem.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todosItem));
  todosProduction(todosItem);
};
let newTodoEditAddBtn;
const todosProduction = (todos) => {
  todosList.innerHTML = "";
  todos.forEach(function (todo) {
    let newTodoLiElem = document.createElement("li");
    newTodoLiElem.className = "completed well";
    let newTodoLabalElem = document.createElement("label");
    newTodoLabalElem.innerHTML = todo.title;
    let newTodoCompleteBtn = document.createElement("button");
    newTodoCompleteBtn.innerHTML = "Complete";
    newTodoCompleteBtn.setAttribute("onclick", "editTodo(" + todo.id + ")");
    let newTodoDeleteBtn = document.createElement("button");
    newTodoDeleteBtn.innerHTML = "Delete";
    newTodoDeleteBtn.setAttribute("onclick", "removeTodo(" + todo.id + ")");
    let newTodoEditBtn = document.createElement("button");
    newTodoEditBtn.innerHTML = "edit";
    newTodoEditBtn.setAttribute("onclick", "editTodoItem(" + todo.id + ")");
    newTodoEditAddBtn = document.createElement("button");
    newTodoEditAddBtn.innerHTML = "addItem";
    newTodoEditAddBtn.style.display = "none";
    newTodoEditAddBtn.setAttribute("onclick", "addItems(" + todo.id + ")");
    if (todo.complete) {
      newTodoLiElem.className = "uncompleted well";
      newTodoCompleteBtn.innerHTML = "UnComplete";
    }
    newTodoLiElem.append(
      newTodoLabalElem,
      newTodoCompleteBtn,
      newTodoDeleteBtn,
      newTodoEditBtn,
      newTodoEditAddBtn
    );
    todosList.append(newTodoLiElem);
  });
};

const filterTodo = (e) => {
  const todos = todosList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
};

const addItems = () => {
  let mainTodoIndex = todosItem.findIndex(
    (todo) => todo.id === currentEditTodoId
  );
  console.log(mainTodoIndex);
  if (mainTodoIndex !== -1) {
    todosItem[mainTodoIndex].title = textTodo.value;
    todosProduction(todosItem);
    localStorage.setItem("todos", JSON.stringify(todosItem));
    textTodo.value = "";
  }
};

//............................................................................................................................................
let currentEditTodoId;

const editTodoItem = (todoId) => {
  let localStorageTodos = JSON.parse(localStorage.getItem("todos"));
  todosItem = localStorageTodos;

  todosItem.forEach((todo) => {
    if (todo.id === todoId) {
      textTodo.value = todo.title;
      currentEditTodoId = todoId;
    }
  });

  todosProduction(todosItem);
  newTodoEditAddBtn.style.display = "block";
  localStorage.setItem("todos", JSON.stringify(todosItem));
};

const editTodo = (todoId) => {
  let localStorageTodos = JSON.parse(localStorage.getItem("todos"));
  todosItem = localStorageTodos;
  todosItem.forEach(function (todo) {
    if (todo.id === todoId) {
      todo.complete = !todo.complete;
    }
  });
  localStorage.setItem("todos", JSON.stringify(todosItem));
  todosProduction(todosItem);
};
const removeTodo = (todoId) => {
  let localStorageTodos = JSON.parse(localStorage.getItem("todos"));
  todosItem = localStorageTodos;
  let mainTodoIndex = todosItem.findIndex(function (todo) {
    return todo.id === todoId;
  });
  todosItem.splice(mainTodoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todosItem));
  todosProduction(todosItem);
};
const getLocalStorage = () => {
  let localStorageTodos = JSON.parse(localStorage.getItem("todos"));
  if (localStorageTodos) {
    todosItem = localStorageTodos;
  } else {
    todosItem = [];
  }
  todosProduction(todosItem);
};
const clearTodos = () => {
  todosItem = [];
  todosProduction(todosItem);
  localStorage.removeItem("todos");
};
textTodo.addEventListener("keydown", (event) => {
  if (event.code === "Enter") {
    addTodos();
  }
});
window.addEventListener("load", getLocalStorage);
filterOption.addEventListener("change", filterTodo);
addTodo.addEventListener("click", addTodos);
clearTodo.addEventListener("click", clearTodos);
