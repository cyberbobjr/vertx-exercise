import {EventBus, HttpServerResponse} from '@vertx/core';
import {BaseApp} from '../interfaces/BaseApp';
import {Router, RoutingContext} from '@vertx/web';
import {appContextName} from '../application';

export class NameApp extends BaseApp {
    static url: string = '/name';
    static appName: string = 'NameApp';

    constructor(eb: EventBus) {
        super(eb);
    }

    buildHandler(router: Router): void {
        router.get('/name')
              .handler((routingContext: RoutingContext) => {
                  this.eb.publish(appContextName, 'yes from NameApp !');
                  const response: HttpServerResponse = routingContext.response();
                  response.putHeader('content-type', 'text/plain')
                          .end('Hello from ' + NameApp.appName);
              })
              .failureHandler((routingContext: RoutingContext) => {
                  routingContext.response().end('error');
              })
    }

    isStarted(): boolean {
        return false;
    }

    start(): void {
    }

    stop(): void {
    }

}