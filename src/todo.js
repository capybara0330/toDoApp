class Todo{
    static #nextId = 1;
    #id;
    #text;
    #completed;

    constructor(text, completed = false){
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

export default Todo;