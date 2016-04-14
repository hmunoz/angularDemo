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
    
    
    <form class="ui large form segment" (ngSubmit)="addTodo()" #todoForm="ngForm">
      <h3 class="ui header">Add  Todo</h3>


      <div class="field">
        <label for="texto">Texto:</label>
        <input [(ngModel)]="model.texto" name="texto" ngControl="texto"  #texto="ngForm"  required placeholder="Ingrese Texto" pInputText>
        <div [hidden]="texto.valid || texto.pristine" class="alert alert-danger">
          Texto is required
        </div>
      </div>
      <div class="field">
        <label for="autor">Autor:</label>
        <input [(ngModel)]="model.autor" name="autor" 
         ngControl="autor"  #autor="ngForm"  required placeholder="Ingrese Autor" pInputText>
         <div [hidden]="autor.valid || autor.pristine" class="alert alert-danger">
          Autor es requerido
        </div>
      </div>

      <button type="submit" pButton icon="fa-external-link-square" label="Enviar" [disabled]="!todoForm.form.valid">
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
    @Input() linea:string;
    private _socket = null;
    msgs: Message[] = [];
    model:Todo;

    constructor(private _todoService:TodoService, private _lineaService:LineaService) {
        this.todosSocket = [
            new Todo('Angular 2', 'http://angular.io', 'A', 0)
        ];
    }


    ngOnInit() {
        this.model = new Todo(null,null,'',0);
        this.linea ='';
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


    private addTodo():void {
        this.model.linea = this.linea;
        this.socket.emit('new-menssage', this.model);
        this.todoService.add(this.model);
        this.model = new Todo(null,null,'',0);
    }

    private cambioDeLinea(linea):void {
        this.linea = linea;
        if (!this.socket == null) {
            this.socket.disconnect();
        }
        this.socket = io.connect('http://localhost:8000/', {forceNew: true, query: "linea=" + linea});

        this.socket.on('messages', function (data) {
            var temp = data[data.length - 1];
            this.todosSocket.push(new Todo(temp.texto, temp.autor, temp.linea, 0));
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
