import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { User } from '../../models/user.model';

@Injectable()
export class UserService {

    constructor(
        private http: Http
    ){}

    update(user: User): Observable<User> {

        let params: URLSearchParams = new URLSearchParams();
        params.set('userId', user._id);
        params.set('name', user.name);
        params.set('password', user.password);
        params.set('city', user.city);
        params.set('province', user.province);
        params.set('country', user.country);   

        let url = "http://localhost:8080/user/";
        let userId = user._id;
        let fullUrl = url.concat(userId);

        return this.http.post(fullUrl, params)
            .map((res: Response) => {
               return new User(res.json().user)
            })
            .catch((err: any) =>  Observable.throw(err));
    }

    getByUser(user: User): Observable<any> {

        let params: URLSearchParams = new URLSearchParams();
        params.set('userId', user._id);
        
        let url = "http://localhost:8080/pub/getByUser";
        
        return this.http.post(url, params)
            .map((res: Response) => {
                return res.json().pubs;
            })
            .catch((err: any) =>  Observable.throw(err));
    }
}