import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Enrollment } from '../interfaces/enrollment.interface';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentsService {
  baseUrl: string = '';
  arrEnrollments = ([] = []);
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/enrollments';
  }

  //traemos los enrollments

  getEnrollments(): Promise<Enrollment[]> {
    return lastValueFrom(this.httpClient.get<Enrollment[]>(this.baseUrl));
  }
  getEnrollmentById(id: number): Promise<Enrollment[]> {
    return lastValueFrom(
      this.httpClient.get<Enrollment[]>(`${this.baseUrl}/${id}`)
    );
  }
  //http://localhost:3333/api/enrollments/students/:studentId
  getEnrollmentByIdStudent(idStudent: number): Promise<Enrollment[]> {
    return lastValueFrom(
      this.httpClient.get<Enrollment[]>(`${this.baseUrl}/students/${idStudent}`)
    );
  }

  //CREATE ENROLL -> POST http://localhost:3000/api/enrollments 
  createEnroll(enroll: Enrollment){
    const httpOptions = {
      headers: new HttpHeaders({'Content-type': 'application/json',})
    };
    return lastValueFrom(
      this.httpClient.post<Enrollment>(this.baseUrl, enroll, httpOptions)
    )
  }

  //PUT ENROLLMENT 
  updateEnrollment(id: number, enroll: any) {
    return lastValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/${id}`, enroll)
    );
  }
}

