import {Component, Input, Output, EventEmitter, Inject} from 'angular2/core';
import {Todo} from "./Todo";
import {List} from 'immutable';
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";
import {TodoStore} from "./state/TodoStore";


@Component({
    selector: 'todo-list',
    template: `

        <section id="main">
            <label for="toggle-all">Mark all as complete</label>
            <ul id="todo-list">
                <li *ngFor="#todo of todoStore.todos | async" [ngClass]="{completed: todo.completed}">
                    <div class="view">
                        <input class="toggle" type="checkbox" (change)="onToggleTodo(todo)" [checked]="todo.completed">
                        <label>{{todo.description}}</label>
                        <button class="destroy" (click)="delete(todo)"></button>
                    </div>
                </li>
            </ul>
        </section>
    `
})
export class TodoList {

    constructor(private todoStore: TodoStore) {

    }


    onToggleTodo(todo: Todo) {
        this.todoStore.toggleTodo(todo);
    }

    delete(todo:Todo) {
        this.todoStore.deleteTodo(todo);
    }

}