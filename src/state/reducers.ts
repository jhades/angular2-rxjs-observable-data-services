
import {List} from 'immutable';
import {Todo} from "../Todo";
import {
    LoadTodosAction, AddTodoAction, ToggleTodoAction, DeleteTodoAction, StartBackendAction, EndBackendAction
} from './todoActions';
import {UiState, initialUiState} from "./ui-state";

export function calculateTodos(state: List<Todo>, action) {
    if (!state) {
        return List([]);
    }

    if (action instanceof  LoadTodosAction) {
        return List(action.todos);
    }
    else if (action instanceof AddTodoAction) {
        return state.push(action.newTodo);
    }
    else if (action instanceof ToggleTodoAction) {
        return toggleTodo(state, action);
    }
    else if (action instanceof DeleteTodoAction) {
        let index = state.findIndex((todo) => todo.id === action.todo.id);
        return state.delete(index);
    }
    else {
        return state;
    }
}

function toggleTodo(state, action) {
    let index = state.findIndex((todo: Todo) => todo.id === action.todo.id);
    let toggled:Todo = state.get(index);
    return state.set(index, new Todo({id:toggled.id, description:toggled.description, completed:!toggled.completed}) );
}

export function calculateUiState(state: UiState, action) {
    if (!state) {
        return initialUiState;
    }

    if (action instanceof StartBackendAction) {
        return new UiState(true, action.message);
    }
    else if (action instanceof EndBackendAction) {
        return new UiState(false, action.message ? action.message : initialUiState.message);
    }
    else {
        return state;
    }
}
