
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

    todos: BehaviorSubject<List<Todo>> = new BehaviorSubject(List([]));

    constructor(private todoBackendService: TodoBackendService) {
        this.loadInitialData();
    }

    get todos() {
        return asObservable(this.todos);
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

    addTodo(newTodo:Todo):Observable {

        let obs = this.todoBackendService.saveTodo(newTodo);

        obs.subscribe(
                res => {
                    this.todos.next(this.todos.getValue().push(newTodo));
                });

        return obs;
    }

    toggleTodo(toggled:Todo): Observable {
        let obs: Observable = this.todoBackendService.toggleTodo(toggled);

        obs.subscribe(
            res => {
                let todos = this.todos.getValue();
                let index = todos.findIndex((todo: Todo) => todo.id === toggled.id);
                let todo:Todo = todos.get(index);
                this.todos.next(todos.set(index, new Todo({id:toggled.id, description:toggled.description, completed:!toggled.completed}) ));
            }
        );

        return obs;
    }


    deleteTodo(deleted:Todo): Observable {
        let obs: Observable = this.todoBackendService.deleteTodo(deleted);

        obs.subscribe(
                res => {
                    let todos: List<Todo> = this.todos.getValue();
                    let index = todos.findIndex((todo) => todo.id === deleted.id);
                    return todos.delete(index);

                }
            );

        return obs;
    }


}