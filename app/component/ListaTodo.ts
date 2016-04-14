import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Component, Input, OnInit} from 'angular2/core';

import {Todo} from '../model/todo';
import {TodoService} from '../service/TodoService';

import {Panel} from 'primeng/primeng';
import {DataList} from 'primeng/primeng'; 
import {DataTable} from 'primeng/primeng';
import {Header} from 'primeng/primeng';
import {Column} from 'primeng/primeng';
import {Footer} from 'primeng/primeng';
import {Growl} from 'primeng/primeng';
import {Message} from 'primeng/primeng';
import {Button} from 'primeng/primeng';
import {LazyLoadEvent} from 'primeng/primeng';


@Component({
    directives: [Panel, DataList,DataTable, Header, Footer,Column,Button, Growl],
    providers: [TodoService],
    templateUrl: 'app/view/todoList.html'
})

export class ListaTodo implements OnInit {
    
    msgs: Message[] = [];
    private _todos:Todo[];
    private _totalRecords: number;

  
    constructor(private _todoService:TodoService) {

    }


    ngOnInit() {
        this.todoService.getAllPag(1,{texto:{value:''},autor:{value:''},'linea.texto':{value:''}}).subscribe((resultado)=>{
            this.todos = resultado.docs;
            this.totalRecords = resultado.total;
        });
    }

    loadCarsLazy(event: LazyLoadEvent) {
        this.todoService.getAllPag(event.first/event.rows +1, event.filters).subscribe((resultado)=>{
            this.todos = resultado.docs;
            this.totalRecords = resultado.total;
        });
    }

    //getter and setter
    get todoService():TodoService {
        return this._todoService;
    }

    set todoService(value:TodoService) {
        this._todoService = value;
    }


    get todos():Todo[] {
        return this._todos;
    }

    set todos(value:Todo[]) {
        this._todos = value;
    }

    get totalRecords():number {
        return this._totalRecords;
    }

    set totalRecords(value:number) {
        this._totalRecords = value;
    }

    show(todo:Todo) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Info Message', detail: todo.autor + ",  "+ todo.texto});
    }


    deleteTodo(todoId:number) {
        this.todoService.delete(todoId);
    }



}
