System.register(['rxjs/add/operator/share', 'rxjs/add/operator/map', 'angular2/core', './model/todo', './service/TodoService', './component/lineaSelector', 'primeng/primeng'], function(exports_1, context_1) {
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
    var core_1, todo_1, TodoService_1, lineaSelector_1, primeng_1, primeng_2, primeng_3, primeng_4, primeng_5, primeng_6;
    var TodoComponent, AppComponent;
    return {
        setters:[
            function (_1) {},
            function (_2) {},
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (todo_1_1) {
                todo_1 = todo_1_1;
            },
            function (TodoService_1_1) {
                TodoService_1 = TodoService_1_1;
            },
            function (lineaSelector_1_1) {
                lineaSelector_1 = lineaSelector_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
                primeng_2 = primeng_1_1;
                primeng_3 = primeng_1_1;
                primeng_4 = primeng_1_1;
                primeng_5 = primeng_1_1;
                primeng_6 = primeng_1_1;
            }],
        execute: function() {
            TodoComponent = (function () {
                function TodoComponent() {
                    this.todo = new todo_1.Todo('Autor', 'Texto', 'A', 0);
                }
                TodoComponent.prototype.voteUp = function () {
                    this.todo.voteUp();
                    return false;
                };
                TodoComponent.prototype.voteDown = function () {
                    this.todo.voteDown();
                    return false;
                };
                TodoComponent = __decorate([
                    core_1.Component({
                        selector: 'reddit-items',
                        inputs: ['todo'],
                        host: {
                            class: 'row'
                        },
                        template: "\n    <div class=\"four wide column center aligned votes\">\n      <div class=\"ui statistic\">\n        <div class=\"value\">\n          {{ todo.votes }}\n        </div>\n        <div class=\"label\">\n          Points\n        </div>\n      </div>\n    </div>\n    <div class=\"twelve wide column\">\n      <a class=\"ui large header\" href=\"{{ todo.autor }}\">\n        {{ todo.texto }}\n      </a>\n      <ul class=\"ui big horizontal list voters\">\n        <li class=\"item\">\n          <a href (click)=\"voteUp()\">\n            <i class=\"arrow up icon\"></i>\n              upvote \n            </a>\n        </li>\n        <li class=\"item\"> \n          <a href (click)=\"voteDown()\">\n            <i class=\"arrow down icon\"></i>\n            downvote\n          </a>\n        </li>\n      </ul>\n    </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], TodoComponent);
                return TodoComponent;
            }());
            AppComponent = (function () {
                //https://angular.io/docs/ts/latest/guide/forms.html 
                function AppComponent(_todoService) {
                    this._todoService = _todoService;
                    this._socket = null;
                    this.msgs = [];
                    this.todosSocket = [
                        new todo_1.Todo('Angular 2', 'http://angular.io', 'A', 0)
                    ];
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.todos = this.todoService.todos$;
                    this.todoService.getAll();
                };
                Object.defineProperty(AppComponent.prototype, "todoService", {
                    //getter and setter
                    get: function () {
                        return this._todoService;
                    },
                    set: function (value) {
                        this._todoService = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppComponent.prototype, "socket", {
                    get: function () {
                        return this._socket;
                    },
                    set: function (value) {
                        this._socket = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                //methos
                AppComponent.prototype.deleteTodo = function (todoId) {
                    this.todoService.delete(todoId);
                };
                AppComponent.prototype.addTodo = function (texto, autor) {
                    var mns = new todo_1.Todo(texto.value, texto.value, this.linea, 0);
                    this.socket.emit('new-menssage', mns);
                    this.todoService.add(mns);
                };
                AppComponent.prototype.cambioDeLinea = function (linea) {
                    this.linea = linea;
                    if (!this.socket == null) {
                        this.socket.disconnect();
                    }
                    this.socket = io.connect('http://localhost:8000/', { forceNew: true, query: "linea=" + linea });
                    this.socket.on('messages', function (data) {
                        //this.addTodoSocket(data[data.length - 1].texto, data[data.length - 1].autor);
                        this.todosSocket.push(data[data.length - 1]);
                    }.bind(this));
                    this.socket.on('disconnect', function () {
                        console.log('Se cancelo la comunicacion.');
                    });
                    this.cambioLineShow(linea);
                };
                AppComponent.prototype.show = function (todo) {
                    this.msgs = [];
                    this.msgs.push({ severity: 'info', summary: 'Info Message', detail: todo.autor + ",  " + todo.texto });
                };
                AppComponent.prototype.cambioLineShow = function (linea) {
                    this.msgs = [];
                    this.msgs.push({ severity: 'info', summary: 'Cambio de Linea', detail: 'Linea: ' + linea });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], AppComponent.prototype, "linea", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'reddit',
                        directives: [TodoComponent, lineaSelector_1.LineaSelector, primeng_1.InputText, primeng_2.Panel, primeng_3.DataList, primeng_4.Header, primeng_5.Footer, primeng_6.Growl],
                        providers: [TodoService_1.TodoService],
                        template: "\n    <linea-selector (select)=\"cambioDeLinea($event)\"></linea-selector>\n    \n    <form class=\"ui large form segment\">\n      <h3 class=\"ui header\">Add  Todo</h3>\n\n      <div class=\"field\">\n        <label for=\"texto\">Texto:</label>\n        <input name=\"texto\" #newTexto pInputText>\n      </div>\n      <div class=\"field\">\n        <label for=\"autor\">Autor:</label>\n        <input name=\"autor\" #newAutor pInputText>\n      </div>\n\n      <button (click)=\"addTodo(newTexto, newAutor)\"\n              class=\"ui positive right floated button\">\n        Submit Todo\n      </button>\n       <p-growl [value]=\"msgs\"></p-growl>\n    </form>\n\n    <div class=\"ui grid posts\">\n      <reddit-items\n        *ngFor=\"#todo of todosSocket\"\n        [todo]=\"todo\">\n      </reddit-items>\n   </div>   \n   \n    \n    \n     <p-panel header=\"Title\">\n     <p-dataList [value]=\"todos | async\" [paginator]=\"true\" [rows]=\"10\">\n    <header>Lista de ...</header>\n    <footer>Choose from the list.</footer>\n     <template #data>\n        <li style=\"border-bottom:1px solid #D5D5D5;\">\n            <div class=\"ui-grid ui-grid-responsive ui-fluid\" style=\"font-size:16px;padding:20px\">\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-3\" style=\"text-align:center\">\n                    <i class=\"fa fa-search\" (click)=\"show(data)\" style=\"cursor:pointer;float:left;margin-top:40px\"></i>\n                    <button (click)=\"deleteTodo(data._id)\">x</button>\n                    </div>\n                    \n                    \n                    <div class=\"ui-grid-col-9\">\n                        <div class=\"ui-grid ui-grid-responsive ui-fluid\">\n                            <div class=\"ui-grid-row\">\n                                <div class=\"ui-grid-col-2\">Vin: </div>\n                                <div class=\"ui-grid-col-10\">{{data.texto}}</div>\n                            </div>\n                            <div class=\"ui-grid-row\">\n                                <div class=\"ui-grid-col-2\">Year: </div>\n                                <div class=\"ui-grid-col-10\">{{data.autor}}</div>\n                            </div>\n                        \n                        </div>\n                    </div>\n                </div>\n            </div>\n        </li>\n    </template>\n</p-dataList>\n    </p-panel>\n  "
                    }), 
                    __metadata('design:paramtypes', [TodoService_1.TodoService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map