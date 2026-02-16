class Todo{
    #id;
    #text;
    #completed;

    constructor(id, text, completed = false){
        this.#id = id;
        this.text = text;
        this.completed = completed;
    }

    toggle(){
        this.completed = !this.completed;
    }

    get id(){
        return this.#id;
    }

    get text(){
        return this.#text;
    }

    get completed(){
        return this.#completed;
    }

    set text(newText){
        this.#text = newText;
    }

    set completed(value){
        this.#completed = value;
    }
}

const todo = new Todo(1, "Buy milk");
console.log(todo);
console.log(todo.id);
console.log(todo.text);
console.log(todo.completed);

todo.text = "Buy eggs";
todo.completed = true;

console.log(todo);
console.log(todo.id);
console.log(todo.text);
console.log(todo.completed);