import TodoList, {FILTERS} from "./todo-list.js";

class TodoApp {
    #todoList;
    #filter;
    #newTodoInput;
    #todoNav;
    #todoListElement;
    #markAllCompleted;
    #clearCompleted;
    #activeTodoCount;

    constructor(){
        this.#todoList = new TodoList();
        this.#filter = FILTERS.ALL;

        this.#newTodoInput = document.getElementsById("todo-nav");
        this.#todoNav = document.getElementById("todo-nav");
        this.#todoListElement = document.getElementById("todo-list");
        this.#markAllCompleted = document.getElementById("clear-completed");
        this.#clearCompleted = document.getElementById("clear-completed");
        this.#activeTodoCount = document.getElementById("todo-count");

        this.#newTodoInput.addEventListener("keydown", this.#handleNewTodoKeyDown.bind(this),);
        this.#todoNav.addEventListener("click", this.#handleClickOnNavbar.bind(this),);
        this.#todoListElement.addEventListener("click", this.#handleClickOnTodoList.bind(this),);
        this.#markAllCompleted.addEventListener("click", this.#handleMarkAllCompleted.bind(this),);
        this.#clearCompleted.addEventListener("click", this.#handleClearCompleted.bind(this),);
    }

    #createTodoText(todo){
        const todoText = document.createElement("div");
        todoText.classList.add("todo-text");
        todoText.setAttribute("id", `todo-text-${todo.id}`);
        todoText.textContent = todo.text;
        if(todo.completed){
            todoText.classList.add("line-through");
        }
        return todoText;
    }

    #createTodoInput(todo){
        const todoInput = document.createElement("input");
        todoInput.classList.add("hidden", "todo-edit");
        todoInput.value = todo.text;
        return todoInput;
    }

    #createTodoItem(todo){
        const todoItem = document.createElement("div");
        todoItem.classList.add("p-4", "todo-item");
        todoItem.append(
            this.#createTodoText(todo),
            this.#createTodoInput(todo),
        );
        return todoItem;
    }

    renderTodos(){
        this.#todoListElement.replaceChildren(
            ...this.#todoList.getTodos(this.#filter).map((todo) => this.#createTodoItem(todo)),
        );
        this.#activeTodoCount.textContent = `${this.#todoList.getNumberOfActiveTodos()} items left`;
    }

    #updateClassList(element, isActive){
        const classes = [
            "underline", 
            "underline-offset-4",
            "decoration-rose-800",
            "decoration-2",
        ];
        if(isActive){
            element.classList.add(...classes);
        }else{
            element.classList.remove(...classes);
        }
    }

    #renderTodoNavBar(href){
        Array.from(this.#todoNav.children).forEach((e) => 
            this.#updateClassList(e, e.href === href),
        );
    }

    #handleNewTodoKeyDown(event){
        const newTodoInput = event.target;
        const todoText = newTodoInput.value.trim();
        if(event.key === "Enter" && todoText !== ""){
            this.#todoList.addTodo(todoText);
            newTodoInput.value = "";
            this.renderTodos();
        }
    }

    #handleClickOnNavbar(event){
        if(event.target.tagName === "A"){
            const href = event.target.href;
            this.#filter = href.split("/").pop() || FILTERS.ALL;
            this.renderTodos();
            this.#renderTodoNavBar(href);
        }
    }

    #handleClickOnTodoList(event){
        if(event.target.id.includes("todo-text")){
            const todoId = event.target.id.split("-").pop();
            this.#todoList.toggleTodo(Number(todoId));
            this.renderTodos();
        }
    }

    #handleMarkAllCompleted(){
        this.#todoList.markAllCompleted();
        this.renderTodos();
    }

    #handleClearCompleted(){
        this.#todoList.clearCompleted();
        this.renderTodos();
    }
}

export default TodoApp;