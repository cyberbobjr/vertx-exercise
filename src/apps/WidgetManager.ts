import {Widget} from '../interfaces/Widget';
import {ILogger} from '../interfaces/ILogger';
import {AppRoute} from '../interfaces/AppRoute';
import {HttpMethod} from '@vertx/core/enums';
import {RoutingContext} from '@vertx/web';

export class WidgetManager extends Widget {
    static appName: string = 'WidgetComponent';
    protected rootApiUrl: string = '/widgets';
    protected routes: Array<AppRoute> = [
        {path: '/list', method: HttpMethod.GET, handler: this.getList.bind(this)},
        {path: '/active', method: HttpMethod.GET, handler: this.getActivated.bind(this)},
    ];
    widgetList: Array<Widget> = [];

    constructor(logger: ILogger) {
        super(logger);
    }

    getList(routingContext: RoutingContext): any {
        return this.widgetList.map(w => w.name);
    }

    getActivated(routingContext: RoutingContext): any {
        return this.widgetList.map(w => w.name);
    }

    addWidget(widget: Widget) {
        this.widgetList.push(widget);
    }
}