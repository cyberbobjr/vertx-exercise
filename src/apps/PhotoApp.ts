import {Widget} from '../interfaces/Widget';
import {ILogger} from '../interfaces/ILogger';
import {AppRoute} from '../interfaces/AppRoute';
import {HttpMethod} from '@vertx/core/enums';
import {RoutingContext} from '@vertx/web';

export class PhotoApp extends Widget {
    protected rootApiUrl: string = '/photo';
    static appName: string = 'PhotoComponent';
    protected routes: Array<AppRoute> = [
        {path: '/', method: HttpMethod.POST, handler: this.uploadPhoto.bind(this)},
    ];

    constructor(logger: ILogger) {
        super(logger);
    }

    uploadPhoto(routingContext: RoutingContext): any {
        for (const file of routingContext.fileUploads()) {
            this.logger.emitLog(PhotoApp.appName, 'Chargement du fichier ' + file.fileName);
        }
        return {result: 'done'};
    }
}