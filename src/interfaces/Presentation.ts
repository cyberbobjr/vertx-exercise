import {Router} from '@vertx/web';
import {Widget} from './Widget';

export interface Presentation {
    getRouter() : Router;

    getListApps(): Array<Widget>;

    getStartedApps(): Array<Widget>;

    getAppByName(name: string): Widget;

    startApp(name: string): boolean;

    stopApp(name: string): boolean;
}