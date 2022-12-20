import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Student } from '../interfaces/student.interface';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  baseUrl: string;
  private arrStudents: Student[] = [];

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/students';
  }

  //CRUD
  //TODO: tienen que ir paginados.....falta implementar
  getAll(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`));
  }
  //devuelve un teacher en base a su ID. También trae info de su user.
  getStudent(id: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/${id}`));
  }

  //PUT

  update(student: Student): Promise<any> {
    return lastValueFrom(
      this.httpClient.put<Student>(
        `${this.baseUrl}/${student.student_id}`,
        student
      )
    );
  }
  //probando método
  updateStudent(idStudent: number, student: Student[]): Promise<any> {
    return lastValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/${idStudent}`, student)
    );
  }
}
