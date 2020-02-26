import {Injectable} from '@angular/core';
import {BaseService} from '../../services/BaseService';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
                providedIn: 'root'
            })
export class PhotoService extends BaseService {

    constructor(private httpClient: HttpClient) {
        super();
    }

    savePhoto(data: FormData): Observable<string> {
        const url = this.baseUrl + 'photo';
        return this.httpClient.post<string>(url, {data});
    }
}
