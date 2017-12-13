import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class PublicationService {

    constructor(
        private http: Http
    ){}

    
    getById(pubId: any): Observable<any> {

        let url = "http://localhost:8080/pub/";
        let _pubId = pubId;
        let fullUrl = url.concat(_pubId)

        return this.http.get(fullUrl)
            .map((res: Response) => {
                return res.json();
            })
            .catch((err: any) => Observable.throw(err));
    }
    
    addComment(comment: any): Observable<any> {

        let params: URLSearchParams = new URLSearchParams();
        let url = "http://localhost:8080/pub/addComment/";
        let pubId = comment.pubId;
        let fullUrl = url.concat(pubId)
        params.set('username', comment.username);
        params.set('comment', comment.commentText);

        return this.http.post(fullUrl, params)
            .map((res: Response) => {
               return res.json()
            })
            .catch((err: any) =>  Observable.throw(err));
    }

    addOfferer(offerer: any): Observable<any> {

        let params: URLSearchParams = new URLSearchParams();
        let url = "http://localhost:8080/pub/addOfferer/";
        let pubId = offerer.pubId;
        let fullUrl = url.concat(pubId)
        params.set('userId', offerer.userId);
        params.set('username', offerer.username);
        params.set('offerAmount', offerer.offerAmount);
        params.set('userPhone', offerer.userPhone);
        params.set('userEmail', offerer.userEmail);

        return this.http.post(fullUrl, params)
            .map((res: Response) => {
                return res.json()
            })
            .catch((err: any) =>  Observable.throw(err));
    }

    setExpired(pubId: any): Observable<any> {

        let params: URLSearchParams = new URLSearchParams();
        let url = "http://localhost:8080/pub/setExpired";
        params.set('pubId', pubId);
        
        return this.http.post(url, params)
            .map((res: Response) => {
                return res.json()
            })
            .catch((err: any) =>  Observable.throw(err));
    }
}