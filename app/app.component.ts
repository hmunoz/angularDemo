import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {ListaTodo} from './component/ListaTodo';
import {SocketComponent} from "./component/SocketComponent";
import {Menu} from 'primeng/primeng';



@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES,Menu],
    template: `
    
    <!-- Menu Bar -->
    <div class="ui menu">
      <div class="ui container">
        <p-menu>
            <ul>
                <li><h3>Menu</h3></li>
                <li><a data-icon="fa-plus" [routerLink]="['ListaTodo']"><span>Todo</span></a></li>
                <li><a data-icon="fa-refresh" [routerLink]="['SocketTodo']"><span>IO</span></a></li>
            </ul>
        </p-menu>
        <div class="header item borderless">
          <h1 class="ui header">
            Angular 2 Ejemplo
          </h1>
        </div>
      </div>
    </div>

    <div class="ui main text container">
      <router-outlet></router-outlet><!-- <--- Our app loads here! -->
    </div>  
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