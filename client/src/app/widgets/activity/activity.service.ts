import {Injectable} from '@angular/core';
import {BaseService} from '../../services/BaseService';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
                providedIn: 'root'
            })
export class ActivityService extends BaseService {

    constructor(private httpClient: HttpClient) {
        super();
    }

    getLogs(): Observable<string[]> {
        const url = this.baseUrl + 'activity';
        return this.httpClient.get<any>(url);
    }
}
