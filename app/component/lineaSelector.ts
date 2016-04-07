import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/core';
import {SelectItem} from 'primeng/primeng';
import {Dropdown} from 'primeng/primeng';
import {Panel} from 'primeng/primeng';

declare let io ;


@Component({ selector: 'linea-selector',
    directives: [Panel,Dropdown],
    templateUrl:'app/component/lineselector.html'

})

export class LineaSelector implements OnInit {
    @Output() select = new EventEmitter();

    lineas: SelectItem[];

    valor: string;


    constructor() {
        this.lineas = [];
        this.lineas.push({label:'Seleccionar Linea...', value:''});
        this.lineas.push({label:'A', value:'A'});
        this.lineas.push({label:'B', value:'B'});
        this.lineas.push({label:'C', value:'C'});
        this.lineas.push({label:'D', value:'D'});
        this.lineas.push({label:'E', value:'E'});
    }


    ngOnInit(){
        this.select.emit("");
    }


     test(event){
    this.select.emit(event.value);
}

}