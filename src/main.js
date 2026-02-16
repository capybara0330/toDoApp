import "./style.css";

const createTodoApp = () => {
    let todos = [];
    let nextTodoId = 1;
    let filter = "all";

    const filterTodos = () => {
        if(filter === "active"){
            return todos.filter((todo) => !todo.completed);
        }else if(filter === "completed"){
            return todos.filter((todo) => todo.completed);
        }else{
            return [...todos];
        }
    };

    return{
        addTodo: (newTodoText) => {
            todos = [...todos, {id: nextTodoId++, text: newTodoText, completed: false}];
        },
        toggleTodo: (todoId) => {
            todos = todos.map((todo) => todo.id === todoId ? {...todo, completed: !todo.completed} : todo,);
        },
        setFilter: (newFilter) => {
            filter = newFilter;
        },
        getTodos: () => filterTodos(),
    };
};

const todoApp = createTodoApp();

const todoListElement = document.getElementById("todo-list");
const inputNewTodo = document.getElementById("new-todo");
const todoNav = document.getElementById("todo-nav");

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

//render todos based on current filter
const renderTodos = () => {
    todoListElement.innerHTML = "";

    const todoElements = todoApp.getTodos().map(createTodoItem);
    todoListElement.append(...todoElements);
}

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

//event handler to create new todo item
const handleKeyDownToCreateNewTodo = (event) => {
    const todoText = event.target.value.trim();
    if(event.key === "Enter" && todoText !== ""){
        todoApp.addTodo(todoText);
        event.target.value = "";
        renderTodos();
    }
};

//event handler to toggle completed status of a todo item
const handleClickOnTodoList = (event) => {
    if(event.target.id.inclues("todo-text")){
        const todoId = event.target.id.split("-").pop();
        todoApp.toggleTodo(Number(todoId));
        renderTodos();
    }
}

//filters todos based on the navbar selection
const handleClickOnNavbar = (event) => {
    if(event.target.tagName === "A"){
        const href = event.target.href;
        filter = href.split("/").pop() || "all";
        renderTodos();
        renderTodoNavBar(href);
    }
};

todoListElement.addEventListener("click", handleClickOnTodoList);
inputNewTodo.addEventListener("keydown", handleKeyDownToCreateNewTodo);
todoNav.addEventListener("click", handleClickOnNavbar);
document.addEventListener("DOMContentLoaded", renderTodos);