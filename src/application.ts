import {Presentation} from './interfaces/Presentation';
import {HttpServerResponse, Vertx} from '@vertx/core';
import {CorsHandler, Router, RoutingContext, SockJSHandler, StaticHandler} from '@vertx/web';
import {ActivityApp} from './apps/ActivityApp';
import {Widget} from './interfaces/Widget';
import {NameApp} from './apps/NameApp';
import {BridgeOptions} from '@vertx/web/options';
import {HttpMethod} from '@vertx/core/enums';
import {PermittedOptions} from '@vertx/bridge-common/options';
import {ILogger} from './interfaces/ILogger';
import {PhotoApp} from './apps/PhotoApp';
import {WidgetManager} from './apps/WidgetManager';

export class Application implements Presentation {
    private apps: Map<string, Widget> = new Map<string, Widget>();
    private readonly mainRouter: Router;
    private name = 'application';

    constructor(private vertx: Vertx,
                private logger: ILogger) {
        this.mainRouter = Router.router(vertx);
        this.initCors();
        this.loadApps();
        this.initAppsRoutes();
        this.initStaticRoutes();
        this.initNotFoundRoute();
        this.initBus();
        this.logger.emitLog(this.name, 'Application started');
    }

    private initCors() {
        this.mainRouter.route().handler(
            CorsHandler.create('http://localhost:4200')
                       .allowedHeader('Content-Type')
                       .allowedMethod(HttpMethod.GET)
                       .allowedMethod(HttpMethod.OPTIONS)
                       .allowedMethod(HttpMethod.POST).handle
        );
    }

    /**
     * Création des composants applicatifs, cette partie peut utiliser une BDD pour instancier une liste précise,
     * scan d'un répertoire, etc.
     */
    private loadApps(): void {
        const widgetList: any[] = [
            ActivityApp,
            PhotoApp,
            NameApp
        ];
        const widgetManager: WidgetManager = new WidgetManager(this.logger);
        this.apps.set(WidgetManager.appName, widgetManager);

        widgetList.forEach(widgetFactory => {
            const widget: Widget = new widgetFactory(this.logger);
            widgetManager.addWidget(widget);
            this.apps.set(widgetFactory.appName, widget);
        });
    }

    private initAppsRoutes() {
        this.apps.forEach((app: Widget) => {
            app.buildHandler(this.vertx, this.mainRouter);
        });
    }

    private initStaticRoutes() {
        this.mainRouter.route('/*').handler(StaticHandler.create('webroot').setCachingEnabled(false).handle);
    }

    private initNotFoundRoute() {
        this.mainRouter
            .route()
            .last()
            .handler((routingContext: RoutingContext) => {
                this.logger.emitLog(this.name, 'Une route n\'a pas été trouvée : ' + routingContext.request().path());
                const response: HttpServerResponse = routingContext.response();
                response.putHeader('content-type', 'text/plain; charset=utf-8')
                        .setStatusCode(404);
                response.end('Page non trouvée');
            });
    }

    private initBus() {
        const regexFilter: string = '.*';
        const options: BridgeOptions = new BridgeOptions().addInboundPermitted(new PermittedOptions().setAddressRegex(regexFilter))
                                                          .addOutboundPermitted(new PermittedOptions().setAddressRegex(regexFilter));
        this.mainRouter.mountSubRouter('/rt', SockJSHandler.create(this.vertx).bridge(options));
    }

    getRouter(): Router {
        return this.mainRouter;
    }

    getAppByName(name: string): Widget {
        return undefined;
    }

    getListApps(): Array<Widget> {
        return undefined;
    }

    getStartedApps(): Array<Widget> {
        return undefined;
    }

    startApp(name: string): boolean {
        return false;
    }

    stopApp(name: string): boolean {
        return false;
    }
}