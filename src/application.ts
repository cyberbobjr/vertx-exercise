import {Presentation} from './interfaces/Presentation';
import {EventBus, HttpServerResponse, Message, Vertx} from '@vertx/core';
import {CorsHandler, Router, RoutingContext, SockJSHandler, StaticHandler} from '@vertx/web';
import {ActivityApp} from './apps/ActivityApp';
import {BaseApp} from './interfaces/BaseApp';
import {NameApp} from './apps/NameApp';
import {configuration} from '../configuration';
import {BridgeOptions} from '@vertx/web/options';
import {HttpMethod} from '@vertx/core/enums';
import {PermittedOptions} from '@vertx/bridge-common/options';

export class Application implements Presentation {
    private apps: Map<string, BaseApp> = new Map<string, BaseApp>();
    private readonly eb: EventBus;
    private readonly mainRouter: Router;

    constructor(private vertx: Vertx) {
        this.eb = vertx.eventBus();
        this.mainRouter = Router.router(vertx);
        this.initCors();
        this.loadApps();
        this.initAppsRoutes();
        this.initStaticRoutes();
        this.initNotFoundRoute();
        this.initBus();
        this.initBusHandler();
        this.eb.publish(configuration.appName, 'Application started');
    }

    private initCors() {
        this.mainRouter.route().handler(
            CorsHandler.create('.+')
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
        this.apps.set(ActivityApp.appName, new ActivityApp(this.eb));
        this.apps.set(NameApp.appName, new NameApp(this.eb));
    }

    private initAppsRoutes() {
        this.apps.forEach((app: BaseApp) => {
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
                this.eb.publish(configuration.appName, 'Une route n\'a pas été trouvée : ' + routingContext.request().path());
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

    getAppByName(name: string): BaseApp {
        return undefined;
    }

    getListApps(): Array<BaseApp> {
        return undefined;
    }

    getStartedApps(): Array<BaseApp> {
        return undefined;
    }

    startApp(name: string): boolean {
        return false;
    }

    stopApp(name: string): boolean {
        return false;
    }

    private initBusHandler() {
        this.eb.consumer(configuration.appName, (message: Message<any>) => {
            console.log(message.body());
        });
    }
}