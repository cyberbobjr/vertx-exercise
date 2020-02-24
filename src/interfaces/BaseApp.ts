import {EventBus, HttpServerRequest} from '@vertx/core';
import {BodyHandler, Router, RoutingContext} from '@vertx/web';
import {Route} from './Route';

export abstract class BaseApp {
    static url: string;
    protected routes: Array<Route> = [];

    protected constructor(protected eb: EventBus) {
    }

    buildHandler(router: Router): void {
        this.routes.forEach(route => {
            router.route(route.method, route.path)
                  .produces('application/json')
                  .consumes('application/json')
                  .handler(BodyHandler.create())
                  .handler(routingContext => {
                      const request: HttpServerRequest = routingContext.request();
                      const result: any = route.handler(request, routingContext);
                      routingContext.response()
                                    .putHeader('content-type', 'application/json; charset=utf-8')
                                    .end(JSON.stringify(result));
                  })
                  .failureHandler((routingContext: RoutingContext) => {
                      const error: Error = routingContext.failure();
                      const code: number = routingContext.statusCode();
                      routingContext.response().setStatusCode(code).end('une erreur est survenue : ' + error.message);
                  })
        })
    }
}