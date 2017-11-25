import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { User } from '../models/user.model';

@Injectable()
export class NotificationsService {

    constructor(
        private http: Http
    ){}

    checkNotifications(userId: any): Observable<any> {

        let url = "http://localhost:8080/user/checkNotifications/";
        let fullUrl = url.concat(userId);

        return this.http.get(fullUrl)
            .map((res: Response) => {
               return res.json()
            })
            .catch((err: any) =>  Observable.throw(err));
    }
    
    setAsRead(readerSetterObj: any): Observable<any> {
        
        let params: URLSearchParams = new URLSearchParams();
        let url = "http://localhost:8080/user/setAsRead";
        params.set('userId', readerSetterObj.userId);
        params.set('notificationId', readerSetterObj.notificationId)

        return this.http.post(url, params)
            .map((res: Response) => {
               return res.json()
            })
            .catch((err: any) =>  Observable.throw(err));
    }
}