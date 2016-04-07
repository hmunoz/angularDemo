import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import {Http, Headers} from 'angular2/http';
import { Injectable} from 'angular2/core';
import {Todo} from '../model/todo';
import {IServiceTodo} from './IServiceTodo';

//Ejemplo: https://github.com/jhades/angular2-rxjs-observable-data-services/blob/master/src/TodoBackendService.ts


@Injectable()
export class TodoService implements IServiceTodo<Todo>{
      _todosObserver: Observer<Todo[]>;
      _dataStore: {todos: Todo[]};

    todos$: Observable<Todo[]>;
    private _baseUrl: string;

    constructor(public http: Http) {
        this._baseUrl  = 'http://localhost:8000/api/todo/';
        this._dataStore = { todos: [] };
        this.todos$ = new Observable(observer =>  this._todosObserver = observer)
            .startWith(this._dataStore.todos)
            .share();
    }

    getAll() {
        this.http.get(this._baseUrl )
            .map(response => response.json())
            .subscribe(data => {
            // Update data store
            this._dataStore.todos = data;
            // Push the new list of todos into the Observable stream
            this._todosObserver.next(this._dataStore.todos);}
                , error => console.log('Could not load todos.'),
                () => console.log('listar todos. OK'));
    }


    delete(id) {
        this.http.delete(this._baseUrl  + id)
            .subscribe(response => {
            this._dataStore.todos.forEach((t, i) => {
                if (t._id === id) { this._dataStore.todos.splice(i, 1); }
            });

            this._todosObserver.next(this._dataStore.todos);
        }, error => console.log('Could not delete todo.')
            ,() => console.log('Eleiminar todo. OK'));
    }


    add(todo: Todo) {
        var _todo = "texto=" + todo.texto + "&autor=" + todo.autor+ "&linea=" + todo.linea;
        //var queryParams = JSON.stringify(todo);

        var queryHeaders = new Headers();
        queryHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

        this.http.post(this._baseUrl,_todo, {headers : queryHeaders} )
            .map(response => response.json())
            .subscribe(data => {
            this._dataStore.todos.push(data);
            this._todosObserver.next(this._dataStore.todos);
        }, error => console.log('Could not create todo.')
            ,() => console.log('agregar todos. OK'));
    
    }



   
}