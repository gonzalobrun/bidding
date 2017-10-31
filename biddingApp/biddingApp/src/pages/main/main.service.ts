import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class MainService {

    constructor(
        private http: Http
    ){}

    //TODO: THIS METHOS IS WRONG, HERE SHOULS CALL TO GET PUBLICATION AROUND YOUR LOCATION.
    //TODO: CREATE METHOD GETPUBSBYLOCATION();
    getRandomPubs(): Observable<any> {
        return this.http.get('http://localhost:8080/pub/random')
            .map((res: Response) => {
               return res.json();
            })
            .catch((err: any) => Observable.throw(err));
    }
}