
import {List,Record} from 'immutable';

const TodoRecord = Record({
    id: 0,
    description: "",
    completed: false
});

export class Todo extends TodoRecord {

    id:number;
    description:string;
    completed: boolean;

    constructor(props) {
        super(props);
    }

}