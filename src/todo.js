class Todo{
    constructor(id, text, completed = false){
        this.id = id;
        this.text = text;
        this.completed = completed;
    }

    toggle(){
        this.completed = !this.completed;
    }
}

const todo = new Todo(1, "Buy milk");
console.log(todo);
todo.toggle();
console.log(todo);
console.log(todo.id);
console.log(todo.text);
console.log(todo.completed);

todo.id = 2;

console.log(todo);