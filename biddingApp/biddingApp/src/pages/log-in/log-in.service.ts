import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class LogInService {

    constructor(
        private http: Http
    ){}

    logIn(user: any): Observable<any> {

        let params: URLSearchParams = new URLSearchParams();

        params.set('username', user.username);
        params.set('password', user.password);

        return this.http.post('http://localhost:8080/user/login', params)
            .map((res: Response) => {                
                return res.json();
            })
            .catch((err: any) => Observable.throw(err));
    }
}