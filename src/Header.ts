import {Component, Output,EventEmitter} from 'angular2/core';


@Component({
    selector:'todo-header',
    template: `
        <header id="header">
            <h1>todos</h1>
            <form id="todo-form" (ngSubmit)="addTodo(input)" autocomplete="off">
                <input id="new-todo" placeholder="What needs to be done?" #input>
            </form>
        </header>
    `
})
export class Header {

    @Output() todo = new EventEmitter();

    addTodo(input) {
        this.todo.emit(input.value);
        input.value = "";
    }

}