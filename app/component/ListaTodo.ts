import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Component, Input, OnInit} from 'angular2/core';

import {Todo} from '../model/todo';
import {TodoService} from '../service/TodoService';

import {Panel} from 'primeng/primeng';
import {DataList} from 'primeng/primeng';
import {Header} from 'primeng/primeng';
import {Footer} from 'primeng/primeng';
import {Growl} from 'primeng/primeng';
import {Message} from 'primeng/primeng';
import {Router, RouteParams} from 'angular2/router';


@Component({
    directives: [Panel, DataList, Header, Footer, Growl],
    providers: [TodoService],
    template: `
     <p-panel header="Title">
     <p-dataList [value]="todos | async" [paginator]="true" [rows]="10">
    <header>Lista de ...</header>
    <footer>Choose from the list.</footer>
     <template #data>
        <li style="border-bottom:1px solid #D5D5D5;">
            <div class="ui-grid ui-grid-responsive ui-fluid" style="font-size:16px;padding:20px">
                <div class="ui-grid-row">
                    <div class="ui-grid-col-3" style="text-align:center">
                    <i class="fa fa-search" (click)="show(data)" style="cursor:pointer;float:left;margin-top:40px"></i>
                    <button (click)="deleteTodo(data._id)">x</button>
                    </div>
                    
                    
                    <div class="ui-grid-col-9">
                        <div class="ui-grid ui-grid-responsive ui-fluid">
                            <div class="ui-grid-row">
                                <div class="ui-grid-col-2">Vin: </div>
                                <div class="ui-grid-col-10">{{data.texto}}</div>
                            </div>
                            <div class="ui-grid-row">
                                <div class="ui-grid-col-2">Year: </div>
                                <div class="ui-grid-col-10">{{data.autor}}</div>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        </li>
    </template>
    </p-dataList>
    </p-panel>
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
