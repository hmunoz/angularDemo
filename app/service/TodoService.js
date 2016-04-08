System.register(['rxjs/Observable', 'rxjs/add/operator/share', 'rxjs/add/operator/map', 'rxjs/add/operator/startWith', 'angular2/http', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var Observable_1, http_1, core_1;
    var TodoService;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            //Ejemplo: https://github.com/jhades/angular2-rxjs-observable-data-services/blob/master/src/TodoBackendService.ts
            TodoService = (function () {
                function TodoService(http) {
                    var _this = this;
                    this.http = http;
                    this._baseUrl = 'http://localhost:8000/api/todo/';
                    this._dataStore = { todos: [] };
                    this.todos$ = new Observable_1.Observable(function (observer) { return _this._todosObserver = observer; })
                        .startWith(this._dataStore.todos)
                        .share();
                }
                TodoService.prototype.getAll = function () {
                    var _this = this;
                    this.http.get(this._baseUrl)
                        .map(function (response) { return response.json(); })
                        .subscribe(function (data) {
                        // Update data store
                        _this._dataStore.todos = data;
                        // Push the new list of todos into the Observable stream
                        _this._todosObserver.next(_this._dataStore.todos);
                    }, function (error) { return console.log('Could not load todos.'); }, function () { return console.log('listar todos. OK'); });
                };
                TodoService.prototype.delete = function (id) {
                    var _this = this;
                    this.http.delete(this._baseUrl + id)
                        .subscribe(function (response) {
                        _this._dataStore.todos.forEach(function (t, i) {
                            if (t._id === id) {
                                _this._dataStore.todos.splice(i, 1);
                            }
                        });
                        _this._todosObserver.next(_this._dataStore.todos);
                    }, function (error) { return console.log('Could not delete todo.'); }, function () { return console.log('Eleiminar todo. OK'); });
                };
                TodoService.prototype.add = function (todo) {
                    var _this = this;
                    var _todo = "texto=" + todo.texto + "&autor=" + todo.autor + "&linea=" + todo.linea;
                    //var queryParams = JSON.stringify(todo);
                    var queryHeaders = new http_1.Headers();
                    queryHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
                    this.http.post(this._baseUrl, _todo, { headers: queryHeaders })
                        .map(function (response) { return response.json(); })
                        .subscribe(function (data) {
                        _this._dataStore.todos.push(data);
                        _this._todosObserver.next(_this._dataStore.todos);
                    }, function (error) { return console.log('Could not create todo.'); }, function () { return console.log('agregar todos. OK'); });
                };
                TodoService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], TodoService);
                return TodoService;
            }());
            exports_1("TodoService", TodoService);
        }
    }
});
//# sourceMappingURL=TodoService.js.map