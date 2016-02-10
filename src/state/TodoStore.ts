
import {Injectable} from "angular2/core";
import {TodoBackendService} from "../TodoBackendService";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {Todo} from "../Todo";
import {List} from 'immutable';
import {asObservable} from "./asObservable";
import {BehaviorSubject} from "rxjs/Rx";

@Injectable()
export class TodoStore {

    _todos: List<Todo> = List([]);

    todos: BehaviorSubject<List<Todo>> = new BehaviorSubject(List([]));

    get todos() {
        return asObservable(this.todos);
    }

    constructor(private todoBackendService: TodoBackendService) {
        this.loadInitialData();
    }

    loadInitialData() {
        this.todoBackendService.getAllTodos()
            .subscribe(
                res => {
                    let todos = (<Object[]>res.json()).map((todo: any) =>
                        new Todo({id:todo.id, description:todo.description,completed: todo.completed}));

                    this.todos.next(todos);
                },
                err => console.log("Error retrieving Todos")
            );

    }

    constructor(todoBackendService: TodoBackendService) {

    }

    addTodo(newTodo:Todo):Observable<List<Todo>> {
        return null;
    }

    toggleTodo(todo:Todo) {
        this.todoBackendService.toggleTodo(todo)
            .subscribe(
                res => console.log('todo toggled successfully'),
                err => console.log('error toggling todo')
            );
    }

    deleteTodo(todo:Todo) {
        this.todoBackendService.deleteTodo(todo)
            .subscribe(
                res => console.log('todo toggled successfully'),
                err => console.log('error toggling todo')
            );    }
}