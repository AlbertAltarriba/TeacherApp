import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
import { Teacher } from '../interfaces/teacher.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  arrTeachers: Teacher[] = [];
  baseUrl: string;
  baseUser: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/teachers';
    this.baseUser = 'http://localhost:3000/api/users/register';
  }
  //Funcionamiento API: primero crea el user, después actualiza a partir del user
  //y crea un admin, teacher o student en función de los datos.

  //CRUD
  //TODO: tienen que ir paginados.....falta implementar
  getAll(offset: number, cant: number): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/${offset}/${cant}`)
    );
  }
  getWithoutPages() {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`));
  }
  //devuelve un teacher en base a su ID. También trae info de su user.
  getTeacher(id: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/${id}`));
  }

  //put
  //http://localhost:3000/api/teachers/teacher/1
  update(teacher: FormData, id: number): Promise<any> {
    return lastValueFrom(
      this.httpClient.put<Teacher>(`${this.baseUrl}/${id}`, teacher)
    );
  }

  //post --> creamos un nuevo teacher (se crea un user y luego se hace put)
  //http://localhost:3000/api/users/register
  createUser(user: User): Promise<any> {
    return lastValueFrom(this.httpClient.post<User>(this.baseUser, user));
  }
  //put
  //http://localhost:3000/api/users/register/teacher/1
  updateTeacher(user: Teacher): Promise<any> {
    return lastValueFrom(
      this.httpClient.put<Teacher>(`${this.baseUser}/${user.user_id}`, user)
    );
  }
}
