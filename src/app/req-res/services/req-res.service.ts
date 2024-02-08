import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Person, ReqResData } from '../models/req-res';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReqResService {
  private httpClient = inject(HttpClient)

  getData(): Observable<Person[]> {
    return this.httpClient.get<ReqResData>('https://reqres.in/api/users?page=2')
         .pipe(map(data => data.data));
  }
}
