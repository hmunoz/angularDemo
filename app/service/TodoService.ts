import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import {Http, Headers,Response} from 'angular2/http';
import { Injectable} from 'angular2/core';
import {Todo} from '../model/todo';
import {IServiceTodo} from './IServiceTodo';

//Ejemplo: https://github.com/jhades/angular2-rxjs-observable-data-services/blob/master/src/TodoBackendService.ts

//https://egghead.io/lessons/rxjs-rxjs-observables-vs-promises


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

    getAllPag(pag, filters) {
        var queryHeaders = new Headers();
        queryHeaders.append('Content-Type', 'application/json');

        return  this.http.put('http://localhost:8000/api/todopag/' + pag, JSON.stringify(filters),{headers : queryHeaders}).
        toPromise().
        then((res:Response) => res.json(), err => console.log(err));
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
     return   this.http.delete(this._baseUrl  + id)
            .toPromise()
            .then((res:Response) => res.json(), err => console.log(err));
    }


    add(todo: Todo) {
        var queryHeaders = new Headers();
        queryHeaders.append('Content-Type', 'application/json');

        this.http.post(this._baseUrl,JSON.stringify(todo), {headers : queryHeaders} )
            .map(response => response.json())
            .subscribe(data => {
            this._dataStore.todos.push(data);
            this._todosObserver.next(this._dataStore.todos);
        }, error => console.log('Could not create todo.')
            ,() => console.log('agregar todos. OK'));
    
    }

    update(todo: Todo) {
        var queryHeaders = new Headers();
        queryHeaders.append('Content-Type', 'application/json');

        this.http.put(this._baseUrl + '570fad1847b51dcb454498bc',JSON.stringify(todo), {headers : queryHeaders} )
            .map(response => response.json())
            .subscribe(data => {
                    this._dataStore.todos.push(data);
                    this._todosObserver.next(this._dataStore.todos);
                }, error => console.log('Could not create todo.')
                ,() => console.log('agregar todos. OK'));

    }
    
   
}