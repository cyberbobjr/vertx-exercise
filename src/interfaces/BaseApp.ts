import {Vertx} from '@vertx/core';
import {BodyHandler, Router, RoutingContext} from '@vertx/web';
import {AppRoute} from './AppRoute';
import {configuration} from '../../configuration';
import {ILogger} from './ILogger';

export abstract class BaseApp {
    protected rootApiUrl: string = '/';
    protected routes: Array<AppRoute> = [];
    static appName: string = '';

    protected constructor(protected logger: ILogger) {
    }

    stop(): boolean {
        return false;
    }

    start(): boolean {
        return false;
    }

    buildHandler(vertx: Vertx, mainRouter: Router): void {
        if (this.routes.length === 0) {
            return;
        }
        const routesApp: Router = Router.router(vertx);
        this.routes.forEach(appRoute => {
            routesApp.route(appRoute.method, appRoute.path)
                     .produces('application/json')
                     .handler(BodyHandler.create())
                     .handler(routingContext => {
                         const result: any = appRoute.handler(routingContext);
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
        mainRouter.mountSubRouter(configuration.apiRootUrl + this.rootApiUrl, routesApp);
    }
}