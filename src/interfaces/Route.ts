import {HttpServerRequest} from '@vertx/core';
import {HttpMethod} from '@vertx/core/enums';
import {RoutingContext} from '@vertx/web';

export interface Route {
    path: string;
    method: HttpMethod;
    handler: (request: HttpServerRequest, routingContext: RoutingContext) => any;
}