import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../../services/BaseService';

@Injectable({
                providedIn: 'root'
            })
export class NameService extends BaseService {
    constructor(private httpClient: HttpClient) {
        super();
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
