import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class TaxonomyService {
    public taxonomyData: any;

    constructor(
        private http: Http
    ){}

    public getTaxonomyData(): Observable<any> {
        return this.http.get('http://localhost:8080/taxonomy')
            .map((res: Response) => {
               return this.taxonomyData = res.json().data;
            })
            .catch((err: any) => Observable.throw(err));
    }

    public get getCategories(){
        return this.taxonomyData.categories;
    }

    public get getStatus(){
        return this.taxonomyData.status;
    }

    public get getTypes(){
        return this.taxonomyData.types;
    }
}