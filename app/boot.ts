import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS,HTTP_BINDINGS} from 'angular2/http';
import { bind ,provide} from "angular2/core";
import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from "angular2/router";
import {AuthHttp, AuthConfig} from 'angular2-jwt';

bootstrap(AppComponent, [
    HTTP_BINDINGS,
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    bind(LocationStrategy).toClass(HashLocationStrategy),
    provide(AuthConfig, { useFactory: () => {
        return new AuthConfig();
    }}),
    AuthHttp
]);