
import {List} from 'immutable';
import {Todo} from "../Todo";

export class LoadTodosAction {

    constructor(public todos: List<Todo>) {

    }
}

export class AddTodoAction {

    constructor(public newTodo: Todo) {

    }

}

export class ToggleTodoAction {
    constructor(public todo: Todo) {

    }
}

export class DeleteTodoAction {

    constructor(public todo: Todo) {

    }
}

export class StartBackendAction {

    constructor(public message:string) {

    }

}

export class EndBackendAction {

    constructor(public message: string) {

    }
}

export type Action = LoadTodosAction | AddTodoAction | ToggleTodoAction | DeleteTodoAction | StartBackendAction | EndBackendAction;
