
/// <reference path="../node_modules/immutable/dist/immutable.d.ts" />

import "angular2/bundles/angular2-polyfills";
import {Component, provide, Inject} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";
import {Header} from "./Header";
import {TodoList} from "./TodoList";
import {Todo} from "./Todo";
import {Footer} from "./Footer";
import {LoadTodosAction, AddTodoAction, StartBackendAction, EndBackendAction, Action} from "./state/todoActions";
import {List} from "immutable";
import {bootstrap} from "angular2/platform/browser";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/share';
import {TodoBackendService} from "./TodoBackendService";
import {TodoStore} from "./state/TodoStore";
import {UiStateStore} from "./state/UiStateStore";
import {UiState} from "./state/ui-state";

@Component({
    selector: 'app',
    directives: [Header, TodoList, Footer],
    template: `
        <div>
            <section id="todoapp">

                <todo-header (todo)="onAddTodo($event)"></todo-header>

                <todo-list></todo-list>

                <todo-footer [hidden]="(size | async) === 0" [count]="size | async"></todo-footer>

            </section>
            <footer id="info">
                <p>{{uiStateMessage | async}}</p>
                <p>Add, Remove and Complete TODOs</p>
            </footer>
        </div>
    `
})
export class App {

    constructor(private todoStore: TodoStore, private uiStateStore: UiStateStore) {

        this.loadInitialData();
    }

    get size() {
        return this.todoStore.todos.map((todos: List<Todo>) => todos.size);
    }

    get uiStateMessage() {
        return this.uiStateStore.uiState.map((uiState: UiState) => uiState.message);
    }


    onAddTodo(description) {
        let newTodo = new Todo({id:Math.random(), description});

        this.uiStateStore.startBackendAction('Saving Todo...');

        this.todoService.saveTodo(newTodo)
            .subscribe(
                res => {
                    this.dispatcher.next(new AddTodoAction(newTodo));
                    this.dispatcher.next(new EndBackendAction(null));
                },
                err => {
                    this.dispatcher.next(new EndBackendAction('Error occurred: '));
                }
            );
    }

    loadInitialData() {
        this.todoService.getAllTodos()
            .subscribe(
                res => {
                    let todos = (<Object[]>res.json()).map((todo: any) =>
                        new Todo({id:todo.id, description:todo.description,completed: todo.completed}));

                    this.dispatcher.next(new LoadTodosAction(List(todos)));
                },
                err => console.log("Error retrieving Todos")
            );

    }

}

bootstrap(App, [
    HTTP_PROVIDERS,
    TodoBackendService,
    TodoStore,
    UiStateStore
]);