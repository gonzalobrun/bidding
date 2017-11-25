import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { User } from '../../models/user.model';

@Injectable()
export class SignInService {

    constructor(
        private http: Http
    ){}

    signIn(user: User): Observable<User> {

        let params: URLSearchParams = new URLSearchParams();

        params.set('name', user.name);
        params.set('username', user.username);
        params.set('password', user.password);
        params.set('city', user.city);
        params.set('province', user.province);
        params.set('country', user.country);
        params.set('email', user.email);
        params.set('phone', user.phone);   

        return this.http.post('http://localhost:8080/user/', params)
            .map((res: Response) => {
               return new User(res.json().user)
            })
            .catch((err: any) =>  Observable.throw(err));
    }
}