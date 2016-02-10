
import {Observable} from "rxjs/Observable";
import {Action} from "./todoActions";
import {ApplicationState} from "./application-state";
import {dispatcher} from "../di-tokens";
import {calculateTodos, calculateUiState} from "./reducers";
import {UiState, initialUiState} from "./ui-state";
import {BehaviorSubject} from "rxjs/Rx";

function wrapIntoBehaviorSubject(init, obs) {
    const res = new BehaviorSubject(init);
    obs.subscribe(s => res.next(s));
    return res;
}

export function applicationStateFactory(initialState: ApplicationState, actions: Observable<Action>): Observable<ApplicationState> {

    let appStateObservable = actions.scan( (state: ApplicationState, action) => {

        console.log("Processing action " + action.getName());

        let newState: ApplicationState = {
          todos: calculateTodos(state.todos, action),
            uiState: calculateUiState(state.uiState, action)
        };

        console.log({
            todos: newState.todos.toJS(),
            uiState: newState.uiState
        });

        return newState;

    } , initialState)
    .share();

    return wrapIntoBehaviorSubject(initialState, appStateObservable);
}