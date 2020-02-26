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
        {path: '/start', method: HttpMethod.POST, handler: this.startWidget.bind(this)},
        {path: '/stop', method: HttpMethod.POST, handler: this.stopWidget.bind(this)},
    ];
    widgetList: Array<Widget> = [];

    constructor(logger: ILogger) {
        super(logger);
    }

    getList(routingContext: RoutingContext): any {
        return this.widgetList.map(w => w.name);
    }

    getActivated(routingContext: RoutingContext): any {
        return this.widgetList.filter(w => w.state === true).map(w => w.name);
    }

    addWidget(widget: Widget) {
        this.widgetList.push(widget);
    }

    stopWidget(routingContext: RoutingContext) {
        const name: any = routingContext.getBodyAsString();
        const widget: Widget = this.widgetList.find(w => w.name === name);
        widget.stop();
        this.logger.emitLog(this.name, 'Widget ' + name + ' stopped');
        return {success: true};
    }

    startWidget(routingContext: RoutingContext) {
        const name: any = routingContext.getBodyAsString();
        const widget: Widget = this.widgetList.find(w => w.name === name);
        widget.start();
        this.logger.emitLog(this.name, 'Widget ' + name + ' started');
        return {success: true};
    }
}