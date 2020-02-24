import {Presentation} from './interfaces/Presentation';
import {Subject} from 'rxjs';
import {EventBus, HttpServerResponse, Vertx} from '@vertx/core';
import {Router, RoutingContext} from '@vertx/web';
import {ActivityApp} from './apps/ActivityApp';
import {BaseApp} from './interfaces/BaseApp';
import {NameApp} from './apps/NameApp';

export const appContextName = 'exercise';

export class Application implements Presentation {
    private apps: Set<BaseApp> = new Set<BaseApp>();
    private readonly eb: EventBus;
    events$: Subject<any> = new Subject();

    constructor(private vertx: Vertx,
                private router: Router) {
        this.eb = vertx.eventBus();
        this.initApps();
        this.initRoutes();
        this.initNotFoundRoute();
    }

    /**
     * Création des composants applicatifs, cette partie peut utiliser une BDD pour instancier une liste précise,
     * scan d'un répertoire, etc.
     */
    private initApps(): void {
        this.apps.add(new ActivityApp(this.eb));
        this.apps.add(new NameApp(this.eb));
    }

    private initRoutes() {
        this.apps.forEach((app: BaseApp) => {
            app.buildHandler(this.router);
        });
    }

    private initNotFoundRoute() {
        this.router.get('/*')
            .handler((routingContext: RoutingContext) => {
                const response: HttpServerResponse = routingContext.response();
                response.putHeader('content-type', 'text/plain').setStatusCode(404);
                response.end('Page not found');
            });
    }

    getRouter(): Router {
        return this.router;
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

}