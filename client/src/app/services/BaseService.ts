import {configuration} from '../../../../configuration';

export abstract class BaseService {
    apiRootUrl: string = configuration.apiRootUrl;
    serverPort: number = configuration.port;
    baseUrl: string = `http://localhost:${this.serverPort.toString()}${this.apiRootUrl}/`;
}