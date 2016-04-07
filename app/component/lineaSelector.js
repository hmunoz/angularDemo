System.register(['angular2/core', 'primeng/primeng'], function(exports_1, context_1) {
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
    var core_1, primeng_1, primeng_2;
    var LineaSelector;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
                primeng_2 = primeng_1_1;
            }],
        execute: function() {
            LineaSelector = (function () {
                function LineaSelector() {
                    this.select = new core_1.EventEmitter();
                    this.lineas = [];
                    this.lineas.push({ label: 'Seleccionar Linea...', value: '' });
                    this.lineas.push({ label: 'A', value: 'A' });
                    this.lineas.push({ label: 'B', value: 'B' });
                    this.lineas.push({ label: 'C', value: 'C' });
                    this.lineas.push({ label: 'D', value: 'D' });
                    this.lineas.push({ label: 'E', value: 'E' });
                }
                LineaSelector.prototype.ngOnInit = function () {
                    this.select.emit("");
                };
                LineaSelector.prototype.test = function (event) {
                    this.select.emit(event.value);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], LineaSelector.prototype, "select", void 0);
                LineaSelector = __decorate([
                    core_1.Component({ selector: 'linea-selector',
                        directives: [primeng_2.Panel, primeng_1.Dropdown],
                        templateUrl: 'app/view/lineselector.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], LineaSelector);
                return LineaSelector;
            }());
            exports_1("LineaSelector", LineaSelector);
        }
    }
});
//# sourceMappingURL=lineaSelector.js.map