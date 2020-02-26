import {Router} from '@vertx/web';

export interface Presentation {
    getRouter() : Router;
}