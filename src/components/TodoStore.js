import { computed, observable } from "mobx"
import Todo from "./Todo.js"

class TodoStore {
    @observable todos = []
    @observable filter = ""
    @computed get filteredTodos() {
        var matchesFilter = new RegExp(this.filter, "i")
        return this.todos.filter(todo => !this.filter || matchesFilter.test(todo.value))
    }

    createTodo(value) {
        this.todos.push(new Todo(value))
    }

    clearComplete = () => {
        // due to observable type of array cannot be deleted from the array but the whole array needs to be replaced by new array including the desired items (=incompleted ones)
        const incompleteTodos =  this.todos.filter(todo => !todo.complete)
        this.todos.replace(incompleteTodos)
    }
}

export default new TodoStore
