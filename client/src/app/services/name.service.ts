import {Injectable} from '@angular/core';
import {configuration} from '../../../../configuration';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
                providedIn: 'root'
            })
export class NameService {
    apiRootUrl: string = configuration.apiRootUrl;
    serverPort: number = configuration.port;
    baseUrl: string = `http://localhost:${this.serverPort.toString()}${this.apiRootUrl}/`;

    constructor(private httpClient: HttpClient) {
    }

    getCurrentName(): Observable<string> {
        const url = this.baseUrl + 'name';
        return this.httpClient.get<string>(url);
    }

    saveName(name: string): Observable<string> {
        const url = this.baseUrl + 'name';
        return this.httpClient.post<string>(url, {name});
    }
}
