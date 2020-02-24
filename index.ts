/// <reference types="es4x" />
// @ts-check
import {HttpServer} from '@vertx/core';
import {Router} from '@vertx/web';
import {Presentation} from './src/domain/interfaces/Presentation';
import {Application} from './src/domain/application';

// your code goes here...
const server: HttpServer = vertx.createHttpServer();
const router: Router = Router.router(vertx);
const appDomain: Presentation = new Application(vertx, router);

try {
    server.requestHandler(appDomain.getRouter()).listen(8080);
    console.log('Listening at http://127.0.0.1:8080');
} catch (e) {
    console.log(e.message);
}
