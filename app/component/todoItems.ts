import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Component} from 'angular2/core';
import {Todo} from '../model/todo';


@Component({
    selector: 'reddit-items',
    inputs: ['todo'],
    host: {
        class: 'row'
    },
    templateUrl: 'app/view/todoItems.html'
})

export class TodoComponentItems {
    todo:Todo;

    constructor() {
        this.todo = new Todo('Autor','Texto','A',0);
    }

    voteUp():Boolean {
        this.todo.voteUp();
        return false;
    }

    voteDown():Boolean {
        this.todo.voteDown();
        return false;
    }
}