import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS,HTTP_BINDINGS} from 'angular2/http';
import { bind } from "angular2/core";
import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from "angular2/router";

//bind(LocationStrategy).toClass(HashLocationStrategy)  Para Ruteo #/
bootstrap(AppComponent,[HTTP_BINDINGS,ROUTER_PROVIDERS,bind(LocationStrategy).toClass(HashLocationStrategy)]);