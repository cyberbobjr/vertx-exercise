/// <reference types="es4x" />
// @ts-check
import {HttpServer} from '@vertx/core';
import {Application} from './src/application';
import {Presentation} from './src/interfaces/Presentation';
import {configuration} from './configuration';
// your code goes here...
const server: HttpServer = vertx.createHttpServer();
const application: Presentation = new Application(vertx);

application.getRouter().getRoutes().forEach(route => console.log(route.getPath()));

try {
    server.requestHandler(application.getRouter()).listen(configuration.port);
    console.log(`Listening at http://127.0.0.1:${configuration.port}`);
} catch (e) {
    console.log(e.message);
}
