import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/startWith';
import {Http, Headers, Response} from 'angular2/http';
import { Injectable} from 'angular2/core';
import {Linea} from '../model/linea';
import {IServiceTodo} from './IServiceTodo';


@Injectable()
export class LineaService implements IServiceTodo<Linea>{

    private _baseUrl: string;

    constructor(public http: Http) {
        this._baseUrl  = 'http://localhost:8000/api/linea/';

    }


    get(id) {
        return this.http.get(this._baseUrl + id).map((res:Response) => res.json());
    }

    getAll() {
        return this.http.get(this._baseUrl).map((res:Response) => res.json());
    }
    

    delete(id) {
        this.http.delete(this._baseUrl  + id)
            .toPromise()
            .then(res => <Linea> res.json().data)
            .then(data => { return data; });
    }


    add(linea: Linea) {
        var _todo = "texto=" + linea.texto;

        var queryHeaders = new Headers();
        queryHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

        this.http.post(this._baseUrl,_todo, {headers : queryHeaders} )
            .toPromise()
            .then(res => <Linea> res.json().data)
            .then(data => { return data; });
    }



   
}