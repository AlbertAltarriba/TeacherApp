import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  arrUsers: User[] = [];
  baseUser: string;
  baseLogin: string;

  constructor(private httpClient: HttpClient) {
    this.baseUser = 'http://localhost:3000/api/users/register';
    this.baseLogin = 'http://localhost:3000/api/users/login'
  }

  createUser(user: User): Promise<any> {

    return lastValueFrom(this.httpClient.post<User>(this.baseUser, user));
  }

  updateUser(user: User): Promise<any> {
    return lastValueFrom(
      this.httpClient.put<User>(`${this.baseUser}/${user.user_id}`, user)
    );
  }

  // POST http://localhost:3000/api/users/login
  login(pFormValue: any): Promise<any> {
    return lastValueFrom(this.httpClient.post<any>(this.baseLogin, pFormValue))
  }
}