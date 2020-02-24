import {HttpServerRequest} from '@vertx/core';
import {HttpMethod} from '@vertx/core/enums';
import {Route, RoutingContext} from '@vertx/web';

export interface AppRoute {
    path: string;
    method: HttpMethod;
    route: Route;
    handler: (request: HttpServerRequest, routingContext: RoutingContext) => any;
}