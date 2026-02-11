import "./style.css";

const todos=[
    {id: 1, text: "Buy milk", completed: false},
    {id: 2, text: "Buy bread", completed: false},
    {id: 3, text: "Buy jam", completed: true},
];
let nextTodoId = 4; //generates unique id
let filter = "all";

function renderTodos(){
    const todoListElement = document.getElementById("todo-list");
    todoListElement.innerHTML = ""; //set empty for clean slate

    let filteredTodos = [];
    for(let i = 0; i < todos.length; i++){
        const todo = todos[i];
        if(filter === "all"){
            filteredTodos.push(todo);
        }else if(filter === "completed" && todo.completed){
            filteredTodos.push(todo);
        }else if(filter === "active" && !todo.completed){
            filteredTodos.push(todo);
        }
    }

    for(let i = 0; i < filteredTodos.length; i++){
        const todo = filteredTodos[i];

        const todoItem = document.createElement("div");
        todoItem.classList.add("p-4", "todo-item");
        todoListElement.appendChild(todoItem);

        const todoText = document.createElement("div");
        todoText.classList.add("todo-text");
        if(todo.completed){
            todoText.classList.add("line-through");
        }
        todoText.textContent = todo.text;
        todoItem.appendChild(todoText);

        const todoEdit = document.createElement("input");
        todoEdit.classList.add("hidden", "todo-edit");
        todoEdit.value = todo.text;
        todoItem.appendChild(todoEdit);
    }
}

function handleNewTodoKeyDown(event){
    const newTodoInput = event.target;
    const todoText = newTodoInput.value.trim();
    if(event.key === "Enter" && todoText !== ""){
        todos.push({id: nextTodoId++, text: todoText, completed: false});
        newTodoInput.value = "";
        renderTodos();
    }
}

function handleClickOnNavbar(event){
    if(event.target.tagName === "A"){
        const hrefValue = event.target.href;
        const action = hrefValue.split("/").pop();
        filter = action === "" ? "all" : action;
        renderTodos();
        renderTodoNavBar(hrefValue);
    }
}

function renderTodoNavBar(href){
    const elements = todoNav.children;
    for(let i = 0; i < elements.length; i++){
        const element = elements[i];
        if(element.href === href){
            element.classList.add(
                "underline",
                "underline-offset-4",
                "decoration-rose-800",
                "decoration-2",
            );
        }else{
            element.classList.remove(
                "underline",
                "underline-offset-4",
                "decoration-rose-800",
                "decoration-2",
            );
        }
    }
}

document.addEventListener("DOMContentLoaded", renderTodos);

const newTodoInput = document.getElementById("new-todo");
newTodoInput.addEventListener("keydown", handleNewTodoKeyDown);

const todoNav = document.getElementById("todo-nav");
todoNav.addEventListener("click", handleClickOnNavbar);