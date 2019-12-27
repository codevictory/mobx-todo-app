import React, { Component } from 'react'
import { observer } from "mobx-react"
import "../styles/main.css"

@observer
export default class TodoList extends Component {
    
    createNew(entered) {
        if(entered.which == 13) {
            this.props.store.createTodo(entered.target.value)
            entered.target.value = ""
        }
    }

    filter(entered) {
        this.props.store.filter = entered.target.value
    }
 
    toggleComplete(todo) {
        todo.complete = !todo.complete
    }

    render() {
        const { filteredTodos, filter } = this.props.store;

        const todoLis = filteredTodos.map(todo => (
            <li key={todo.id}>
                {todo.value}
                <input type="checkbox" onChange={this.toggleComplete.bind(this, todo)} value={todo.complete} checked={todo.complete} />
            </li>
        ))
        return (
            <div>
                <h1>Todo App</h1>
                <h3>MobX Rules!</h3>
                <hr />
                <h2>Todos</h2>
                <div className="inputRow">
                    <div className="inputContainer">
                        <div>Filter: { filter } </div>
                        <input className="filter" value={filter} onChange={this.filter.bind(this)} />
                    </div>
                    <div className="inputContainer">
                        <div>Create New:</div>
                        <input className="createNew" onKeyPress={this.createNew.bind(this)} />
                    </div>
                </div>
                <ul>{todoLis}</ul>
                <a href="#" onClick={this.props.store.clearComplete}>Clear Complete</a>
            </div>
        )
    }
}
