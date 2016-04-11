
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Component, Input, OnInit} from 'angular2/core';

import {Todo} from '../model/todo';
import {Linea} from '../model/linea';
import {TodoService} from '../service/TodoService';
import {LineaService} from '../service/LineaService';

import {Panel} from 'primeng/primeng';
import {Button} from 'primeng/primeng';
import {InputText} from 'primeng/primeng';
import {DataList} from 'primeng/primeng';
import {Header} from 'primeng/primeng';
import {Footer} from 'primeng/primeng';
import {Growl} from 'primeng/primeng';
import {Message} from 'primeng/primeng';

import {LineaSelector} from './lineaSelector';
import {TodoComponentItems} from '../component/todoItems';

declare let io;


@Component({
    directives: [TodoComponentItems,LineaSelector,Panel, DataList, Header, Footer, Growl,Button, InputText],
    providers: [TodoService,LineaService],
    template: `
     <linea-selector (select)="cambioDeLinea($event)"></linea-selector>
    
    <form class="ui large form segment">
      <h3 class="ui header">Add  Todo</h3>

      <div class="field">
        <label for="texto">Texto:</label>
        <input name="texto" #newTexto pInputText required="true" placeholder="Ingrese Texto">
      </div>
      <div class="field">
        <label for="autor">Autor:</label>
        <input name="autor" #newAutor pInputText required="true" placeholder="Ingrese Autor">
      </div>

      <button (click)="addTodo(newTexto, newAutor)" pButton icon="fa-external-link-square" label="Enviar">
      </button>
       <p-growl [value]="msgs"></p-growl>
    </form>

    <div class="ui grid posts">
      <reddit-items
        *ngFor="#todo of todosSocket"
        [todo]="todo">
      </reddit-items>
   </div>   
    `
})

export class SocketComponent implements OnInit {


   
    todosSocket:Todo[];
    @Input() linea;
    private _socket = null;
    msgs: Message[] = [];


    //https://angular.io/docs/ts/latest/guide/forms.html 

    constructor(private _todoService:TodoService, private _lineaService:LineaService) {
        this.todosSocket = [
            new Todo('Angular 2', 'http://angular.io', 'A', 0)
        ];
    }


    ngOnInit() {
        
    }

    //getter and setter
    get todoService():TodoService {
        return this._todoService;
    }

    set todoService(value:TodoService) {
        this._todoService = value;
    }


    get lineaService():LineaService {
        return this._lineaService;
    }

    set lineaService(value:LineaService) {
        this._lineaService = value;
    }

    get socket():any {
        return this._socket;
    }

    set socket(value:any) {
        this._socket = value;
    }

    //methos

    deleteTodo(todoId:number) {
        this.todoService.delete(todoId);
    }


    private addTodo(texto:HTMLInputElement, autor:HTMLInputElement):void {

        let mns = new Todo(texto.value,texto.value,this.linea, 0);

        this.socket.emit('new-menssage', mns);
        this.todoService.add(mns);

    }

    private cambioDeLinea(linea):void {
        this.linea = linea;
        if (!this.socket == null) {
            this.socket.disconnect();
        }
        this.socket = io.connect('http://localhost:8000/', {forceNew: true, query: "linea=" + linea});

        this.socket.on('messages', function (data) {
             this.todosSocket.push(data[data.length - 1]);
        }.bind(this));

        this.socket.on('disconnect', function () {
            console.log('Se cancelo la comunicacion.');
        });


        this.lineaService.get(linea).subscribe((linea:Linea)=>{
            this.cambioLineShow(linea.texto);
        });



    }



    show(todo:Todo) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Info Message', detail: todo.autor + ",  "+ todo.texto});
    }

    cambioLineShow(linea) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Cambio de Linea', detail: 'Linea: ' + linea});
    }


}
