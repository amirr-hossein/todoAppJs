const textTodo=document.querySelector(".itemInput")
const addTodo=document.querySelector(".addButton")
const clearTodo=document.querySelector(".clearButton")
const todosList=document.querySelector(".todoList")
let todosItem = []
const addTodos=()=>{
    let todoValue=textTodo.value
    let newTodo={
        id:todosItem.length+1,
        title:todoValue,
        complete:false
    }
    textTodo.value=""
    todosItem.push(newTodo)
    localStorage.setItem('todos', JSON.stringify(todosItem))
    todosProduction(todosItem)
}
const todosProduction=(todos)=>{
    todosList.innerHTML=""
    todos.forEach(function (todo) {
        console.log(todo);
        let newTodoLiElem = document.createElement('li')
        newTodoLiElem.className = 'completed well'

        let newTodoLabalElem = document.createElement('label')
        newTodoLabalElem.innerHTML = todo.title

        let newTodoCompleteBtn = document.createElement('button')
        newTodoCompleteBtn.innerHTML = 'Complete'
        newTodoCompleteBtn.setAttribute('onclick', 'editTodo(' + todo.id + ')')

        let newTodoDeleteBtn = document.createElement('button')
        newTodoDeleteBtn.innerHTML = 'Delete'
        newTodoDeleteBtn.setAttribute('onclick', 'removeTodo(' + todo.id + ')')

        if (todo.complete) {
            newTodoLiElem.className = 'uncompleted well'
            newTodoCompleteBtn.innerHTML = 'UnComplete'
        }

        newTodoLiElem.append(newTodoLabalElem, newTodoCompleteBtn, newTodoDeleteBtn)

        todosList.append(newTodoLiElem)
    })
}
function editTodo(todoId) {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))
    todosItem = localStorageTodos
    todosItem.forEach(function (todo) {
        if (todo.id === todoId) {
            todo.complete = !todo.complete
        }
    })  
    localStorage.setItem('todos', JSON.stringify(todosItem))
    todosProduction(todosItem)
}
const removeTodo=(todoId)=> {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))
    todosItem = localStorageTodos
    let mainTodoIndex = todosItem.findIndex(function (todo) {
        return todo.id === todoId
    })
    todosItem.splice(mainTodoIndex, 1)
    localStorage.setItem('todos', JSON.stringify(todosItem))
    todosProduction(todosItem)

}
const getLocalStorage=()=> {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))
    if (localStorageTodos) {
        todosItem = localStorageTodos
    } else {
        todosItem = []
    }
    todosProduction(todosItem)
}
function clearTodos() {
    todosItem = []
    todosProduction(todosItem)
    localStorage.removeItem('todos')
}
textTodo.addEventListener('keydown',(event)=> {
    if (event.code === 'Enter') {
        addTodos()
    }
})
window.addEventListener('load', getLocalStorage)
addTodo.addEventListener("click",addTodos)
clearTodo.addEventListener('click', clearTodos)