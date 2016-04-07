import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Component, Input, OnInit} from 'angular2/core';
import {Todo} from './model/todo';
import {TodoService} from './service/TodoService';
import {LineaSelector} from './component/lineaSelector';
import {InputText} from 'primeng/primeng';
import {Panel} from 'primeng/primeng';
import {DataList} from 'primeng/primeng';
import {Header} from 'primeng/primeng';
import {Footer} from 'primeng/primeng';
import {Growl} from 'primeng/primeng';
import {Message} from 'primeng/primeng';
import {TodoComponentItems} from './component/todoItems';


declare let io;



@Component({
    selector: 'app',
    directives: [TodoComponentItems, LineaSelector, InputText, Panel, DataList, Header, Footer, Growl],
    providers: [TodoService],
    template: `
    <linea-selector (select)="cambioDeLinea($event)"></linea-selector>
    
    <form class="ui large form segment">
      <h3 class="ui header">Add  Todo</h3>

      <div class="field">
        <label for="texto">Texto:</label>
        <input name="texto" #newTexto pInputText>
      </div>
      <div class="field">
        <label for="autor">Autor:</label>
        <input name="autor" #newAutor pInputText>
      </div>

      <button (click)="addTodo(newTexto, newAutor)"
              class="ui positive right floated button">
        Submit Todo
      </button>
       <p-growl [value]="msgs"></p-growl>
    </form>

    <div class="ui grid posts">
      <reddit-items
        *ngFor="#todo of todosSocket"
        [todo]="todo">
      </reddit-items>
   </div>   
   
    
    
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
  `
})


export class AppComponent implements OnInit {

    todos:Observable<Todo[]>;
    todosSocket:Todo[];
    @Input() linea;
    private _socket = null;
    msgs: Message[] = [];
    

    //https://angular.io/docs/ts/latest/guide/forms.html 

    constructor(private _todoService:TodoService) {
        this.todosSocket = [
            new Todo('Angular 2', 'http://angular.io', 'A', 0)
        ];
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
            //this.addTodoSocket(data[data.length - 1].texto, data[data.length - 1].autor);
            this.todosSocket.push(data[data.length - 1]);
        }.bind(this));

        this.socket.on('disconnect', function () {
            console.log('Se cancelo la comunicacion.');
        });

        this.cambioLineShow(linea);


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


