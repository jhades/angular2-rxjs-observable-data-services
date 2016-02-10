
import {Injectable} from "angular2/core";
import {TodoBackendService} from "../TodoBackendService";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {Todo} from "../Todo";
import {List} from 'immutable';
import {asObservable} from "./asObservable";

@Injectable()
export class TodoStore {

    _todos: List<Todo> = List([]);

    todos: Subject<List<Todo>> = new Subject();

    get todos() {
        return asObservable(this.todos);
    }

    constructor(todoBackendService: TodoBackendService) {

    }


}