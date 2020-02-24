import {Subject} from 'rxjs';
import {Router} from '@vertx/web';
import {BaseApp} from './BaseApp';

export interface Presentation {
    events$: Subject<any>

    getRouter() : Router;

    getListApps(): Array<BaseApp>;

    getStartedApps(): Array<BaseApp>;

    getAppByName(name: string): BaseApp;

    startApp(name: string): boolean;

    stopApp(name: string): boolean;
}