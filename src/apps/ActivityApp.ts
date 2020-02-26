import {BaseApp} from '../interfaces/BaseApp';
import {ILogger} from '../interfaces/ILogger';
import {AppRoute} from '../interfaces/AppRoute';
import {HttpMethod} from '@vertx/core/enums';
import {RoutingContext} from '@vertx/web';

export class ActivityApp extends BaseApp {
    static appName: string = 'Activity';
    protected rootApiUrl: string = '/activity';
    protected routes: Array<AppRoute> = [
        {path: '/', method: HttpMethod.GET, handler: this.getLogs.bind(this)},
    ];

    constructor(logger: ILogger) {
        super(logger);
    }

    getLogs(routingContext: RoutingContext): string {
        return JSON.stringify(this.logger.getLogsSince());
    }
}