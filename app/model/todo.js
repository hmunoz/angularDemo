System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Todo;
    return {
        setters:[],
        execute: function() {
            Todo = (function () {
                function Todo(autor, texto, linea, votes) {
                    this.autor = autor;
                    this.texto = texto;
                    this.linea = linea;
                    this.votes = votes;
                }
                Todo.prototype.voteUp = function () {
                    this.votes += 1;
                };
                Todo.prototype.voteDown = function () {
                    this.votes -= 1;
                };
                return Todo;
            }());
            exports_1("Todo", Todo);
        }
    }
});
//# sourceMappingURL=todo.js.map