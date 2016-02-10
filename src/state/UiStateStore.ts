
import {Injectable} from "angular2/core";
import {UiState, initialUiState} from "./ui-state";
import {Subject} from "rxjs/Subject";
import {asObservable} from "./asObservable";
import {BehaviorSubject} from "rxjs/Rx";

@Injectable()
export class UiStateStore {

    uiState: BehaviorSubject<UiState> = new BehaviorSubject(initialUiState);

    get uiState() {
        return asObservable(this.uiState);
    }


    startBackendAction(message:string) {
        this.uiState.next({
            actionOngoing: true,
            message
        });
    }

    endBackendAction() {
        this.uiState.next({
            actionOngoing: false,
            message: ''
        });
    }
}