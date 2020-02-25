import {EventBus, Vertx} from '@vertx/core';
import {BodyHandler, Router, RoutingContext} from '@vertx/web';
import {AppRoute} from './AppRoute';

export abstract class BaseApp {
    protected rootApiUrl: string = '/';
    protected routes: Array<AppRoute> = [];
    static appName: string = '';

    protected constructor(protected eb: EventBus) {
    }

    stop(): boolean {
        return false;
    }

    start(): boolean {
        return false;
    }

    buildHandler(vertx: Vertx, mainRouter: Router): void {
        const routesApp: Router = Router.router(vertx);
        this.routes.forEach(route => {
            routesApp.route(route.method, route.path)
                     .produces('application/json')
                     .consumes('application/json')
                     .handler(BodyHandler.create())
                     .handler(routingContext => {
                         const result: any = route.handler(routingContext);
                         routingContext.response()
                                       .putHeader('content-type', 'application/json; charset=utf-8')
                                       .end(JSON.stringify(result));
                     })
                     .failureHandler((routingContext: RoutingContext) => {
                         const error: Error = routingContext.failure();
                         const code: number = routingContext.statusCode();
                         routingContext.response().setStatusCode(code).end('une erreur est survenue : ' + error.message);
                     })
        });
        mainRouter.mountSubRouter(this.rootApiUrl, routesApp);
    }
}