/// <reference types="es4x" />
// @ts-check
import {HttpServer} from '@vertx/core';
import {Application} from './src/application';
import {Presentation} from './src/interfaces/Presentation';
// your code goes here...
const server: HttpServer = vertx.createHttpServer();
const application: Presentation = new Application(vertx);
try {
    server.requestHandler(application.getRouter()).listen(8080);
    console.log('Listening at http://127.0.0.1:8080');
} catch (e) {
    console.log(e.message);
}
