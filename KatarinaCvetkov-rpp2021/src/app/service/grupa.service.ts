import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Grupa } from "../model/grupa.model";

@Injectable()
export class GrupaService {

    //End Point u Development modu
    //private readonly API_URL = 'http://localhost:8082/grupa/';

    //End Point u Deployment modu
    private readonly API_URL = 'https://rpp-backend-kc.herokuapp.com/grupa/';

    dataChange: BehaviorSubject<Grupa[]> = new BehaviorSubject<Grupa[]>([]);

    constructor (private httpClient: HttpClient) {
    }

    public getAllGrupa(): Observable<Grupa[]> {
        this.httpClient.get<Grupa[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
        return this.dataChange.asObservable();
    }

    public addGrupa(grupa: Grupa): void {
        this.httpClient.post(this.API_URL, grupa).subscribe();
    }

    public updateGrupa(grupa: Grupa): void {
        this.httpClient.put(this.API_URL + grupa.id, grupa).subscribe();
    }

    public deleteGrupa(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }



}
