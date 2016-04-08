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
import {Router, RouteParams} from 'angular2/router';


@Component({
    directives: [Panel, DataList,DataTable, Header, Footer,Column,Button, Growl],
    providers: [TodoService],
    template: `
    <p-dataTable [value]="todos | async" [rows]="10" [paginator]="true" sortMode="multiple" [responsive]="true">
    <header>Lista</header>
    <p-column field="texto" header="texto" [filter]="true" [sortable]="true"></p-column>
    <p-column field="autor" header="autor" [filter]="true" filterMatchMode="contains" [sortable]="true"></p-column>
    <p-column field="linea" header="Linea" [filter]="true" [sortable]="true"></p-column>
    <p-column style="width:10%;text-align:center">
        <template #todo="rowData">
            <button type="button" pButton (click)="show(todo)" icon="fa-search"></button>
            <button type="button" pButton (click)="deleteTodo(todo._id)" icon="fa-remove"></button>
        </template>
    </p-column>
    <footer>Fin de las Lista</footer>
    </p-dataTable>
    
   
    <p-growl [value]="msgs"></p-growl>
    `
})

export class ListaTodo implements OnInit {

    todos:Observable<Todo[]>;

    msgs: Message[] = [];


    //https://angular.io/docs/ts/latest/guide/forms.html

    constructor(private _todoService:TodoService,
                private _router: Router,
                routeParams: RouteParams) {

    }


    ngOnInit() {
        this.todos = this.todoService.todos$;
        this.todoService.getAll();
    }

    //getter and setter
    get todoService():TodoService {
        return this._todoService;
    }

    set todoService(value:TodoService) {
        this._todoService = value;
    }





    show(todo:Todo) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Info Message', detail: todo.autor + ",  "+ todo.texto});
    }


}
