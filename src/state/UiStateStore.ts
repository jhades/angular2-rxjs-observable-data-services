
import {Injectable} from "angular2/core";
import {UiState} from "./ui-state";
import {Subject} from "rxjs/Subject";
import {asObservable} from "./asObservable";

@Injectable()
export class UiStateStore {

    _uiState: UiState;

    uiState: Subject<UiState> = new Subject();

    get uiState() {
        return asObservable(this.uiState);
    }


}