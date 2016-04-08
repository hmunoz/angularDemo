import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {ListaTodo} from './component/ListaTodo';
import {SocketComponent} from "./component/SocketComponent";



@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES],
    template: `
    <h1 class="title">Demo Lia</h1>
    <nav>
      <a [routerLink]="['ListaTodo']">Lista de Todos</a>
      <a [routerLink]="['SocketTodo']">SocketIO demo</a>
      
    </nav>
    <router-outlet></router-outlet>
  `
})
@RouteConfig([
    {
        path: '/',
        name: 'SocketTodo',
        component: SocketComponent,
        useAsDefault: true
    },
    {path: '/lista',   name: 'ListaTodo',     component: ListaTodo}
])

export class AppComponent {
    
}