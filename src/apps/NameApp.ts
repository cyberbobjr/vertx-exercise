import {BaseApp} from '../interfaces/BaseApp';
import {HttpMethod} from '@vertx/core/enums';
import {AppRoute} from '../interfaces/AppRoute';
import {RoutingContext} from '@vertx/web';
import {ILogger} from '../interfaces/ILogger';

export class NameApp extends BaseApp {
    protected rootApiUrl: string = '/name';
    static appName: string = 'NameApp';
    private internalName: string = 'default';
    protected routes: Array<AppRoute> = [
        {path: '/', method: HttpMethod.GET, handler: this.getName.bind(this)},
        {path: '/', method: HttpMethod.POST, handler: this.postName.bind(this)},
    ];

    constructor(protected logger: ILogger) {
        super(logger);
    }

    private emitMessage(message: string) {
        this.logger.emitLog(NameApp.appName, message);
    }

    getName(routingContext: RoutingContext): string {
        try {
            this.emitMessage('ask for name');
            return this.internalName;
        } catch (e) {
            console.log(e.message);
        }
    }

    postName(routingContext: RoutingContext): any {
        try {
            const body: any = routingContext.getBodyAsString();
            this.emitMessage('get new name : ' + body);
            const {name} = JSON.parse(body);
            this.internalName = name;
            return {result: 'ok'};
        } catch (e) {
            console.log(e.message);
            routingContext.fail(500);
        }
    }
}