import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/core';
import {SelectItem} from 'primeng/primeng';
import {Dropdown} from 'primeng/primeng';
import {Panel} from 'primeng/primeng';
import {LineaService} from '../service/LineaService';
import {Linea} from '../model/linea';
import {HTTP_PROVIDERS}    from 'angular2/http';

declare let io ;


@Component({ selector: 'linea-selector',
    directives: [Panel,Dropdown],
    providers: [HTTP_PROVIDERS,LineaService],
    templateUrl:'app/view/lineselector.html'

})

export class LineaSelector implements OnInit {
    @Output() select = new EventEmitter();

    linea: String;

    constructor(private _lineaService:LineaService) {

    }

    lineas: SelectItem[];


    get lineaService():LineaService {
        return this._lineaService;
    }

    set lineaService(value:LineaService) {
        this._lineaService = value;
    }

    ngOnInit(){
        this.linea = '';
        //this.select.emit("");
        this.lineaService.getAll().subscribe((lineas:Linea[])=>{
            this.lineas = [];
            this.lineas.push({label: 'Seleccionar linea...', value:''});
            for(var key in lineas) {
                this.lineas.push({label: lineas[key].texto, value:lineas[key]._id});
            }
        });
    }


    cambioDeLinea(){
    this.select.emit(this.linea);
    }

}