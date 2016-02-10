
export class UiState {

    constructor(public actionOngoing: boolean, public message:string) {

    }

}

export const initialUiState = {
    actionOngoing: false,
    message: 'Ready'
};