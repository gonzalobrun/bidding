import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class MainService {

    constructor(
        private http: Http
    ){}

    //TODO: THIS METHOS IS WRONG, HERE SHOULS CALL TO GET PUBLICATION AROUND YOUR LOCATION.
    //TODO: CREATE METHOD GETPUBSBYLOCATION();

    getWithFilters(filters: any): Observable<any> {
        
        let params: URLSearchParams = new URLSearchParams();

        params.set('categories', filters.categories);
        params.set('country', filters.country);
        params.set('province', filters.province);
        params.set('city', filters.city);
        params.set('type', filters.type); 
        params.set('status', filters.status);  

        return this.http.post('http://localhost:8080/pub/getWithFilters', params)
            .map((res: Response) => {
                return res.json()
            })
            .catch((err: any) =>  Observable.throw(err));
    }
}