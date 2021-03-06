import { Projekat } from './../model/projekat.model';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class ProjekatService {

    //End Point u Development modu
    //private readonly API_URL = 'http://localhost:8082/projekat/';

    //End Point u Deployment modu
    private readonly API_URL = 'https://rpp-backend-kc.herokuapp.com/projekat/';

    dataChange: BehaviorSubject<Projekat[]> = new BehaviorSubject<Projekat[]>([]);

    constructor(private httpClient: HttpClient){
    }

    public getAllProjekat(): Observable<Projekat[]> {
        this.httpClient.get<Projekat[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
        return this.dataChange.asObservable();
    }

    public addProjekat(projekat: Projekat): void {
        this.httpClient.post(this.API_URL, projekat).subscribe();
    }

    public updateProjekat(projekat:Projekat): void {
        this.httpClient.put(this.API_URL + projekat.id, projekat).subscribe();
    }

    public deleteProjekat(id: number):void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }

}