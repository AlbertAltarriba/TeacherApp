import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  zip: number = 0;
  subject: string = '';
  idSubjectChecked: boolean = false;
  baseUrl: string;

  arrFiltros: any[] = [];

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/teachers/';
  }

  guardarFiltro($event: any) {
    const inputS: any = $event?.target.checked;
    if (inputS) {
      this.arrFiltros.push(inputS);
    } else {
      this.arrFiltros.splice(this.arrFiltros.indexOf(inputS), 1);
    }
    console.log(this.arrFiltros);
  }
  // getTeachersNear(zip: string, subject: string) {
  //   return lastValueFrom(
  //     this.httpClient.get(
  //       this.baseUrl + 'teachersnear?materia=/' + subject + 'cp=/' + zip
  //     )
  //   );
  // }
}

//imágenes par amulter
//https://github.com/mariogiron/UploadImageAngularExpress
