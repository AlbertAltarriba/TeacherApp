import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SubjectsService } from 'src/app/services/subjects.service';
import { Subject } from 'src/app/interfaces/subject.interface';
import { TeachersService } from 'src/app/services/teachers.service';
import { Teacher } from 'src/app/interfaces/teacher.interface';

import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-mapaside',
  templateUrl: './mapaside.component.html',
  styleUrls: ['./mapaside.component.scss'],
})
export class MapasideComponent implements OnInit {
  showFilterMateria: Boolean = false;
  showFilterValoration: Boolean = false;
  showFilterExperience: Boolean = false;
  showFilterPrices: Boolean = false;

  arrSubjects: Subject[] = [];
  arrTeachers: Teacher[] = [];
  arrExperiences: number[] = [];
  arrValorations: number[] = [];
  arrPrices: number[] = [];

  arrFiltros: any[] = [];

  offset: number = 0;
  cant: number = 8;
  page: number = 1;

  // @Output() subjects: EventEmitter<Subject>;
  constructor(
    private subjecsService: SubjectsService,
    private teachersService: TeachersService,
    private dataService: DataService
  ) {
    // this.subjects = new EventEmitter();
  }

  ngOnInit(): void {
    this.getSubjects();
    this.getExperiences();
    this.getValorations();
    this.getPrices();
  }

  viewMaterias(): Boolean {
    this.showFilterMateria = !this.showFilterMateria;
    return this.showFilterMateria;
  }
  viewValoration(): Boolean {
    this.showFilterValoration = !this.showFilterValoration;

    return this.showFilterValoration;
  }
  viewExperience(): Boolean {
    this.showFilterExperience = !this.showFilterExperience;
    return this.showFilterExperience;
  }
  viewPrices(): Boolean {
    this.showFilterPrices = !this.showFilterPrices;
    return this.showFilterPrices;
  }

  async getSubjects() {
    this.arrSubjects = await this.subjecsService.getAll();

    return this.arrSubjects;
  }
  async getExperiences() {
    try {
      let response = await this.teachersService.getAll(this.offset, this.cant);
      //devuelve un objeto con 2 arrays. Nos quedamos con el primero.
      this.arrTeachers = response;

      const ar = this.arrTeachers.forEach((teacher) => {
        this.arrExperiences.push(teacher.teach_experience_years);
      });
      return this.arrExperiences;
    } catch (error) {
      return console.log(error);
    }
  }
  async getValorations() {
    try {
      let response = await this.teachersService.getAll(this.offset, this.cant);

      //devuelve un objeto con 2 arrays. Nos quedamos con el primero.
      this.arrTeachers = response;
      //TODO: cambiar teach_id_user por el campo valoration cuando esté en la API
      const val = this.arrTeachers.forEach((teacher) => {
        this.arrValorations.push(teacher.teach_id_user);
      });
      return this.arrValorations;
    } catch (error) {
      return console.log(error);
    }
  }
  async getPrices() {
    try {
      let response = await this.teachersService.getAll(this.offset, this.cant);
      //devuelve un objeto con 2 arrays. Nos quedamos con el primero.
      this.arrTeachers = response;

      const val = this.arrTeachers.forEach((teacher) => {
        this.arrPrices.push(teacher.teach_price_an_hour);
      });
      return this.arrPrices;
    } catch (error) {
      return console.log(error);
    }
  }
  //tengo un array de filtros con los filtros seleccionados
  guardarFiltro($event: any) {
    const inputS: any = $event?.target.checked;
    if (inputS) {
      this.arrFiltros.push(inputS);
    } else {
      this.arrFiltros.splice(this.arrFiltros.indexOf(inputS), 1);
    }
    console.log(this.arrFiltros);
  }
  quitarFiltros($event: any) {
    const inputMinus: any = $event?.target.value;
    this.arrFiltros.filter((element) => (element = !inputMinus));
    return this.arrFiltros;
  }
}
