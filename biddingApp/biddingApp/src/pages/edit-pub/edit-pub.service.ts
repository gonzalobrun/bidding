import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Publication } from '../../models/publication.model';

@Injectable()
export class EditPubService {

    constructor(
        private http: Http
    ){}

    update(pub: Publication): Observable<Publication> {

        let params: URLSearchParams = new URLSearchParams();
        params.set('pubId', pub._id);
        params.set('categories', pub.categories.toLocaleString());
        params.set('city', pub.location.city)
        params.set('country', pub.location.country.toString());
        params.set('description', pub.description);
        params.set('minimunPrice', pub.minimunPrice ? pub.minimunPrice.toString() : null);
        params.set('province', pub.location.province.toString());
        params.set('status', pub.status.toString());
        params.set('title', pub.title);
        params.set('type', pub.type.toString());
        params.set('city', pub.location.city);
        params.set('province', pub.location.province);
        params.set('country', pub.location.country);

        let url = "http://localhost:8080/pub/update/";
        let pubId = pub._id;
        let fullUrl = url.concat(pubId);

        return this.http.post(fullUrl, params)
            .map((res: Response) => {
               return new Publication(res.json().pub)
            })
            .catch((err: any) =>  Observable.throw(err));
    }
}