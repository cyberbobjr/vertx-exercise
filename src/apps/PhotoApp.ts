import {Widget} from '../interfaces/Widget';
import {ILogger} from '../interfaces/ILogger';
import {AppRoute} from '../interfaces/AppRoute';
import {HttpMethod} from '@vertx/core/enums';
import {RoutingContext} from '@vertx/web';
import {Buffer} from '@vertx/core';

export class PhotoApp extends Widget {
    protected rootApiUrl: string = '/photo';
    static appName: string = 'PhotoComponent';
    protected routes: Array<AppRoute> = [
        {path: '/', method: HttpMethod.POST, handler: this.uploadPhoto.bind(this)},
        {path: '/', method: HttpMethod.GET, handler: this.getPhoto.bind(this)},
        {path: '/isExisting', method: HttpMethod.GET, handler: this.isExisting.bind(this)},
    ];
    private currentPhoto: string;

    constructor(logger: ILogger) {
        super(logger);
    }

    uploadPhoto(routingContext: RoutingContext): any {
        for (const file of routingContext.fileUploads()) {
            this.currentPhoto = file.uploadedFileName();
            this.logger.emitLog(PhotoApp.appName, 'Chargement du fichier ' + file.fileName());
        }
        return {result: 'done', path: this.currentPhoto};
    }

    getPhoto(routingContext: RoutingContext) {
        if (this.currentPhoto) {
            routingContext.response().sendFile(this.currentPhoto);
        }
        return {result: 'done'};
    }

    isExisting(routingContext: RoutingContext) {
        return {result: !!this.currentPhoto};
    }
}