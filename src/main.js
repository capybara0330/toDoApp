import "./style.css";

let todos=[
    {id: 1, text: "Buy milk", completed: false},
    {id: 2, text: "Buy bread", completed: false},
    {id: 3, text: "Buy jam", completed: true},
];
let nextTodoId = 4; //generates unique id
let filter = "all";

const renderTodos = () => {
    todoListElement.replaceChildren(
        ...filterTodos(todos, filter).map(createTodoItem),
    );
};

function handleNewTodoKeyDown(event){
    const newTodoInput = event.target;
    const todoText = newTodoInput.value.trim();
    if(event.key === "Enter" && todoText !== ""){
        todos = addTodo(todos, todoText);
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

const handleClickOnTodoList = (event) => {
    if(event.target.id.includes("todo-text")){
        const todoId = event.target.id.split("-").pop();
        todos = toggleTodo(todos, Number(todoId));
        renderTodos();
    }
}

document.addEventListener("DOMContentLoaded", renderTodos);

const newTodoInput = document.getElementById("new-todo");
newTodoInput.addEventListener("keydown", handleNewTodoKeyDown);

const todoNav = document.getElementById("todo-nav");
todoNav.addEventListener("click", handleClickOnNavbar);

const todoListElement = document.getElementById("todo-list");
todoListElement.addEventListener("click", handleClickOnTodoList);

////////////////////
//helper functions//
////////////////////

//creates todo text element
const createTodoText = (todo) => {
    const todoText = document.createElement("div");
    todoText.id = `todo-text-${todo.id}`;
    todoText.classList.add(
        "todo-text",
        ...(todo.completed ? ["line-through"] : []),
    );
    todoText.innerText = todo.text;
    return todoText;
};

//creates todo edit input element
const createTodoEditInput = (todo) =>{
    const todoEdit = document.createElement("input");
    todoEdit.classList.add("hidden", "todo-edit");
    todoEdit.value = todo.text;
    return todoEdit;
};

//creates todo item
const createTodoItem = (todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("p-4", "todo-item");
    todoItem.append(createTodoText(todo), createTodoEditInput(todo));
    return todoItem;
}

//filters todos based on current filter setting
const filterTodos = (todos, filter) =>{
    if(filter === "active"){
        return todos.filter((todo) => !todo.completed);
    } else if (filter === "completed"){
        return todos.filter((todo) => todo.completed);
    }else{
        return [...todos];
    }
}

//creates a new array with the existing todos and a new todo item
const addTodo = (todos, newTodoText) => [
    ...todos,
    {id: nextTodoId++, text: newTodoText, completed:false},
];

//toggles the completed status of a todo item
const toggleTodo = (todos, todoId) => todos.map((todo) => todo.id === todoId ? {...todo, completed: !todo.completed} : todo,);

//updates class list of a navbar element
const updateClassList = (element, isActive) => {
    const classes = [
        "underline",
        "underline-offset-4",
        "decoration-rose-800",
        "decoration-2",
    ];

    if(isActive) {
        element.classList.add(...classes);
    }else{
        element.classList.remove(...classes);
    }
};

//renders navbar anchor elements
const renderTodoNavBar = (href) => {
    Array.from(todoNav.children).forEach((element) => {
        updateClassList(element, element.href === href);
    });
};

//filters todos based on the navbar selection
const handleClickOnNavbar = (event) => {
    if(event.target.tagName === "A"){
        const href = event.target.href;
        filter = href.split("/").pop() || "all";
        renderTodos();
        renderTodoNavBar(href);
    }
};