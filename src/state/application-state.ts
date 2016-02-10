
import {Todo} from "../Todo";
import {List} from "immutable";
import {UiState} from "./ui-state";


export interface ApplicationState {
    todos: List<Todo>,
    uiState: UiState
}