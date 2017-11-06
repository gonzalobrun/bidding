import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Publication } from '../../models/publication.model';

@Injectable()
export class LoadService {

    constructor(
        private http: Http
    ){}

    createPub(pub: Publication): Observable<Publication> {

        let params: URLSearchParams = new URLSearchParams();

        params.set('categories', pub.categories.toLocaleString());
        // params.set('city', pub.location.city)
        // params.set('country', pub.location.country.toString());
        params.set('description', pub.description);
        params.set('expirationDate', pub.expirationDate.toString());
        params.set('imgURL', pub.imgURL.toLocaleString());
        params.set('minimunPrice', pub.minimunPrice.toString());
        params.set('owner', pub.owner.toString());
        // params.set('province', pub.location.province.toString());
        params.set('status', pub.status.toString());
        params.set('title', pub.title);
        params.set('type', pub.type.toString());
        params.set('location', pub.location.toString())

        return this.http.post('http://localhost:8080/pub', params)
            .map((res: Response) => {
               return new Publication(res.json().pub)
            })
            .catch((err: any) =>  Observable.throw(err));
    }
}