import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminService {

    constructor(
        private http: Http
    ){}

    getAllUsers(): Observable<any> {
        return this.http.get('http://localhost:8080/user/allUsers')
            .map((res: Response) => {
               return res.json();
            })
            .catch((err: any) => Observable.throw(err));
    }
}