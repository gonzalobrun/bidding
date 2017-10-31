import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Publication } from '../../models/publication.model';

@Injectable()
export class SignInService {

    constructor(
        private http: Http
    ){}

    createPub(pub: Publication): Observable<Publication> {

        let params: URLSearchParams = new URLSearchParams();

        // params.set('type', pub.type.toString());
        // params.set('title', pub.title);
        // params.set();
        // params.set();
        // params.set();
        // params.set();
        // params.set();
        // params.set();
        // params.set();
        // params.set();
        // params.set();

        return this.http.post('http://localhost:8080/pub', params)
            .map((res: Response) => {
               return new Publication(res.json().pub)
            })
            .catch((err: any) =>  Observable.throw(err));
    }
}