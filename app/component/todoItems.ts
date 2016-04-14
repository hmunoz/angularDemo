import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Component} from 'angular2/core';
import {Todo} from '../model/todo';
import {TodoService} from '../service/TodoService';

@Component({
    selector: 'reddit-items',
    providers: [TodoService],
    inputs: ['todo'],
    host: {
        class: 'row'
    },
    templateUrl: 'app/view/todoItems.html'
})

export class TodoComponentItems {
    todo:Todo;

    constructor(private _todoService:TodoService) {
        this.todo = new Todo('Autor','Texto','A',0);
    }


    get todoService():TodoService {
        return this._todoService;
    }

    set todoService(value:TodoService) {
        this._todoService = value;
    }

    voteUp():Boolean {
        this.todo.voteUp();
        this.todoService.update(this.todo);
        return false;
    }

    voteDown():Boolean {
        this.todo.voteDown();
        this.todoService.update(this.todo);
        return false;
    }
}