import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Admin } from '../interfaces/admin.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminsService {
  private arrAdmins: Admin[] = [];

  baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/admin';
  }

  getAll(): Admin[] {
    return this.arrAdmins;
  }
  getAdmin(id: number): Admin[] | any {
    return this.arrAdmins.find((admin) => admin.admin_id === id);
  }

  getAdminById(id: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/${id}`));
  }

  update(admin: Admin): Promise<any> {
    return lastValueFrom(
      this.httpClient.put<Admin>(`${this.baseUrl}/${admin.admin_id}`, admin)
    );
  }
}
