System.register(['angular2/core', 'primeng/primeng', '../service/LineaService', 'angular2/http'], function(exports_1, context_1) {
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
    var core_1, primeng_1, primeng_2, LineaService_1, http_1;
    var LineaSelector;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
                primeng_2 = primeng_1_1;
            },
            function (LineaService_1_1) {
                LineaService_1 = LineaService_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            LineaSelector = (function () {
                function LineaSelector(_lineaService) {
                    this._lineaService = _lineaService;
                    this.select = new core_1.EventEmitter();
                }
                Object.defineProperty(LineaSelector.prototype, "lineaService", {
                    get: function () {
                        return this._lineaService;
                    },
                    set: function (value) {
                        this._lineaService = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                LineaSelector.prototype.ngOnInit = function () {
                    var _this = this;
                    this.linea = '';
                    this.select.emit("");
                    this.lineaService.getAll().subscribe(function (lineas) {
                        _this.lineas = [];
                        _this.lineas.push({ label: 'Seleccionar Linea...', value: '' });
                        for (var key in lineas) {
                            _this.lineas.push({ label: lineas[key].texto, value: lineas[key]._id });
                        }
                    });
                };
                LineaSelector.prototype.cambioDeLinea = function () {
                    this.select.emit(this.linea);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], LineaSelector.prototype, "select", void 0);
                LineaSelector = __decorate([
                    core_1.Component({ selector: 'linea-selector',
                        directives: [primeng_2.Panel, primeng_1.Dropdown],
                        providers: [http_1.HTTP_PROVIDERS, LineaService_1.LineaService],
                        templateUrl: 'app/view/lineselector.html'
                    }), 
                    __metadata('design:paramtypes', [LineaService_1.LineaService])
                ], LineaSelector);
                return LineaSelector;
            }());
            exports_1("LineaSelector", LineaSelector);
        }
    }
});
//# sourceMappingURL=lineaSelector.js.map