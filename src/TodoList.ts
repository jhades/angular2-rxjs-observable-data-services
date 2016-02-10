import {Component, Input, Output, EventEmitter, Inject} from 'angular2/core';
import {Todo} from "./Todo";
import {List} from 'immutable';
import {TodoService} from "./TodoService";
import {ToggleTodoAction, DeleteTodoAction, Action} from './state/todoActions';
import {dispatcher,state} from "./di-tokens";
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";
import {ApplicationState} from "./state/application-state";


@Component({
    selector: 'todo-list',
    template: `

        <section id="main">
            <label for="toggle-all">Mark all as complete</label>
            <ul id="todo-list">
                <li *ngFor="#todo of todos| async" [ngClass]="{completed: todo.completed}">
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

    constructor(private todoService: TodoService,
                @Inject(dispatcher) private dispatcher: Observer<Action>,
                @Inject(state) private state: Observable<ApplicationState>) {

    }

    get todos() {
        return this.state.map((state: ApplicationState) => state.todos);
    }

    onToggleTodo(todo: Todo) {

        this.dispatcher.next(new ToggleTodoAction(todo));

        this.todoService.toggleTodo(todo)
            .subscribe(
                res => console.log('todo toggled successfully'),
                err => console.log('error toggling todo')
            );
    }

    delete(todo:Todo) {
        this.dispatcher.next(new DeleteTodoAction(todo));

        this.todoService.deleteTodo(todo)
            .subscribe(
                res => console.log('todo toggled successfully'),
                err => console.log('error toggling todo')
            );

    }

}