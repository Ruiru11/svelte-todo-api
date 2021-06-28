import Todo from "../models/todo" ;


export async function createTodo(todoData){
    const newTodo = new Todo(todoData);
    if(newTodo){
        await newTodo.save();
        return newTodo;
    } else {
        throw {
            status:400,
            message:"Error during event"
        }
    }
}


