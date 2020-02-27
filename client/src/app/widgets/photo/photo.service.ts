import {Injectable} from '@angular/core';
import {BaseService} from '../../services/BaseService';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
                providedIn: 'root'
            })
export class PhotoService extends BaseService {

    constructor(private httpClient: HttpClient) {
        super();
    }

    savePhoto(data: FormData): Observable<any> {
        const url = this.baseUrl + 'photo';
        return this.httpClient.post<any>(url, data);
    }

    isExisting(): Observable<boolean> {
        const url = this.baseUrl + 'photo/isExisting';
        return this.httpClient.get<any>(url)
                   .pipe(
                       map(r => r.result)
                   );
    }
}
