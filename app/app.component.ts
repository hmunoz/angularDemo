import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Component,enableProdMode} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Location} from 'angular2/router';
import {ListaTodo} from './component/ListaTodo';
import {SocketComponent} from "./component/SocketComponent";
import {Menu} from 'primeng/primeng';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';

// -- Enable production module -------------------------------------------------
enableProdMode();


declare var Auth0Lock;

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
            <div>
                <a href="#" *ngIf="!loggedIn()" (click)="login()">Login</a>
                <a href="#" *ngIf="loggedIn()" (click)="logout()">Logout</a>
              </div>  
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
        path: '/home',
        name: 'SocketTodo',
        component: SocketComponent,
        useAsDefault: true
    },
    {path: '/lista',   name: 'ListaTodo',     component: ListaTodo}
])

export class AppComponent {
    lock = new Auth0Lock('Iwkmtdobw2OZqRdPkgnTrjAIu1EGswKX', 'unrn.auth0.com');
    jwtHelper: JwtHelper = new JwtHelper();
    location: Location;
    constructor(location: Location) {
        this.location = location;
    }

    login() {
        var self = this;
        this.lock.show((err: string, profile: string, id_token: string) => {
            if (err) {
                throw new Error(err);
            }

            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', id_token);

            console.log(
                this.jwtHelper.decodeToken(id_token),
                this.jwtHelper.getTokenExpirationDate(id_token),
                this.jwtHelper.isTokenExpired(id_token)
            );

            self.loggedIn();
        });
    }

    logout() {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');

        this.loggedIn();
    }

    loggedIn() {
        return tokenNotExpired();
    }

    isActive(path) {
        return this.location.path() === path;
    }
}