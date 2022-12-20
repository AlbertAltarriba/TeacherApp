import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Subject } from '../interfaces/subject.interface';

@Injectable({

  providedIn: 'root',
})
export class SubjectsService {
  baseURL: string = 'http://localhost:3000/api/subjects';
  constructor(private httpClient: HttpClient) {}

  //recupera todas las subjects
  getAll(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(this.baseURL));
  }
  //recupera una subject por su id
  //http://localhost:3333/api/subjects/:subjectId
  getSubject(id: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseURL}/${id}`));
  }

  create(subject: Subject): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return lastValueFrom(
      this.httpClient.post<Subject>(this.baseURL, subject, httpOptions)
    );
  }
  //busco una subject por id
}
