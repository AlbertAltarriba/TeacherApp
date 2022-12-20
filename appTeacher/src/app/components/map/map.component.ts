import { Component, OnInit } from '@angular/core';

import { TeachersService } from 'src/app/services/teachers.service';
import { DataService } from 'src/app/services/data.service';
import { SubjectsService } from 'src/app/services/subjects.service';
import { EnrollmentsService } from 'src/app/services/enrollments.service';
import { Subject } from 'src/app/interfaces/subject.interface';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { environment } from 'src/environments/environment';
import {
  MapTypeControlOptions,
  ControlPosition,
} from '@agm/core/services/google-maps-types';
import { Enrollment } from 'src/app/interfaces/enrollment.interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  //filtros front
  showFilterMateria: Boolean = false;
  showFilterValoration: Boolean = false;
  showFilterExperience: Boolean = false;
  showFilterPrices: Boolean = false;

  //filter inputs
  inputSubject: number = 0;
  inputValoration: number = 0;
  inputExperience: number = 0;
  inputPrice: number = 0.0;

  //arrays
  arrExperiences: number[] = [];
  arrValorations: number[] = [];
  arrPrices: number[] = [];
  arrTeachers: Teacher[] = [];
  arrTeachersAll: Teacher[] = [];
  arrSubjects: Subject[] = [];
  arrEnrollments: Enrollment[] = [];
  arrAssessments: number[] = [];

  subjects: any[] = [];
  enrolls: Enrollment[] = [];
  arrFiltros: any[] = [];
  nearTeachers: any = [];
  teacherPosition: any = [];
  coordenadas: any[] = [];
  teachersWithCoords: any[] = [];

  zip: number = 0;
  subject: string = 'esperando al data del servicio';
  currentPosition: any = {};
  token: boolean = false;

  //pages
  offset: number = 0;
  cant: number = 8;
  currentPage: number = 1;
  num_pages: number = 1;
  length: number = 0;

  public lat: number;
  public lng: number;
  public zoom: number;

  constructor(
    private teachersService: TeachersService,
    private dataService: DataService,
    private subjectsService: SubjectsService,
    private enrollmentsService: EnrollmentsService
  ) {
    this.lat = 0;
    this.lng = 0;
    this.zoom = 6;
    // this.markers = [];
  }

  ngOnInit(): void {
    this.getSubjects();
    this.getTeachers();
    this.getTeachersToAdmin();
    this.getExperiences();
    this.getValorations();
    this.getPrices();
    this.getEnrollments();
    this.getAssessments();
    this.calculateLastPage();
    // this.getTeachersNear('28290', 'MATES');
    //traigo zip y subject seleccionado del home.
    this.zip = this.dataService.zip;
    this.subject = this.dataService.subject;

    //centra el mapa en el lugar del navegador
    this.currentPosition = navigator.geolocation.getCurrentPosition(
      (position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      }
    );

    this.coords();
    this.checkToken();
  }

  //pagination
  previousPagination() {
    this.currentPage = this.currentPage - 1;

    if (this.currentPage >= 1) {
      this.offset -= 8;
      this.getTeachers();
    }
    if (this.currentPage < 1) {
      this.offset = 0;
      this.currentPage = 1;
    }
  }

  nextPagination() {
    this.currentPage = this.currentPage + 1;
    if (this.currentPage <= this.num_pages) {
      this.offset += 8;
      this.getTeachers();
    } else {
      this.currentPage = this.num_pages;
    }
  }

  calculateLastPage() {
    let limit = 8;

    if ((this.length / limit) % 1 != 0) {
      this.num_pages = Math.trunc(this.length / limit) + 1;
    } else {
      this.num_pages = this.length / limit;
    }

    return this.num_pages;
  }
  //recogemos los teachers
  async getTeachers(): Promise<Teacher[] | any> {
    try {
      const arrTeachers = await this.teachersService.getAll(
        this.offset,
        this.cant
      );

      this.arrTeachers = arrTeachers;
      this.arrTeachers = this.arrTeachers.filter((teacher) => {
        return teacher.teach_validated === 'SI';
      });

      return this.arrTeachers;
    } catch (error) {
      console.log(error);
    }
  }
  //recogemos todos los teachers sin filtros
  async getTeachersToAdmin(): Promise<any> {
    try {
      const response = await this.teachersService.getWithoutPages();
      this.arrTeachersAll = response;
      this.length = this.arrTeachersAll.length;
      this.calculateLastPage();

      return this.arrTeachersAll;
    } catch (error) {
      console.log(error);
    }
  }

  //guardar las subjects en un array y luego buscarlas.
  async getSubjects() {
    try {
      this.arrSubjects = await this.subjectsService.getAll();
      // console.log(this.arrSubjects);
      return this.arrSubjects;
    } catch (error) {
      return console.log(error);
    }
  }

  //array de experiencias
  async getExperiences() {
    try {
      let response = await this.teachersService.getWithoutPages();
      //devuelve un objeto con 2 arrays. Nos quedamos con el primero.
      this.arrTeachers = response;

      let ar = this.arrTeachers.forEach((teacher) => {
        this.arrExperiences.push(teacher.teach_experience_years);
      }); //muestra todas las experiencias de los profesore
      this.arrExperiences = Array.from(new Set(this.arrExperiences));
      this.arrExperiences.sort((a, b) => a - b); //elimina los duplicados;
      return this.arrExperiences;
    } catch (error) {
      return console.log(error);
    }
  }
  //array valoraciones
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
  //array de precios
  async getPrices() {
    try {
      let response = await this.teachersService.getWithoutPages();
      //devuelve un objeto con 2 arrays. Nos quedamos con el primero.
      this.arrTeachers = response;

      const val = this.arrTeachers.forEach((teacher) => {
        this.arrPrices.push(teacher.teach_price_an_hour);
      });
      this.arrPrices = Array.from(new Set(this.arrPrices));
      this.arrPrices.sort((a, b) => a - b); //elimina los duplicados;

      return this.arrPrices;
    } catch (error) {
      return console.log(error);
    }
  }

  async getAssessments() {
    try {
      let response = await this.enrollmentsService.getEnrollments();
      this.arrEnrollments = response;
      const val = this.arrEnrollments.forEach((enroll) => {
        this.arrAssessments.push(enroll.enroll_assessment);
      });
      this.arrAssessments = Array.from(new Set(this.arrAssessments));
      this.arrAssessments.sort((a, b) => a - b); //elimina los duplicados;

      return this.arrAssessments;
    } catch (error) {
      return console.log(error);
    }
  }

  //busco una subject por id
  findSubject(id: number) {
    const subjectName = this.arrSubjects.filter((s) => {
      return s.subj_id === id;
    });
    if(subjectName[0] !== undefined){
    return subjectName[0].subj_name;
    }
  else return
  }

  async getEnrollments(): Promise<void> {
    try {
      const response = await this.enrollmentsService.getEnrollments();

      this.arrEnrollments = response;
      // console.log(this.arrEnrollments);
    } catch (error) {
      return console.log(error);
    }
  }

  //filtros de materia - valoración - experiencia y precios para buscar profes.

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

  //filtra los profes de una materia en concreto
  filterTeachers(pSubject: number) {
    const teachers: any = this.arrTeachers.filter((teacher) => {
      return teacher.teach_id_subject === pSubject;
    });
  }

  //filtro de los teacher de las card
  async teacherFilter(
    inputSubject: number,
    inputValoration: number,
    inputExperience: number,
    inputPrice: number
  ) {
    try {
      this.arrTeachers = await this.getTeachers();
      this.inputSubject = 0;
      this.inputValoration = 0;
      this.inputExperience = 0;
      this.inputPrice = 0;
      this.showFilterMateria = false;
      this.showFilterValoration = false;
      this.showFilterExperience = false;
      this.showFilterPrices = false;
      if (
        inputSubject != 0 &&
        inputValoration == 0 &&
        inputExperience == 0 &&
        inputPrice == 0
      ) {
        this.arrTeachers = this.arrTeachersAll.filter((teacher) => {
          return teacher.teach_id_subject == inputSubject;
        });
      }

      if (
        inputSubject == 0 &&
        inputValoration != 0 &&
        inputExperience == 0 &&
        inputPrice == 0
      ) {
        this.arrTeachers = this.arrTeachersAll.filter((teacher) => {
          return this.getTeacherAverage(teacher.teach_id) == inputValoration;
        });
      }

      if (
        inputSubject == 0 &&
        inputValoration == 0 &&
        inputExperience != 0 &&
        inputPrice == 0
      ) {
        this.arrTeachers = this.arrTeachersAll.filter((teacher) => {
          return teacher.teach_experience_years == inputExperience;
        });
      }
      if (
        inputSubject == 0 &&
        inputValoration == 0 &&
        inputExperience == 0 &&
        inputPrice != 0
      ) {
        this.arrTeachers = this.arrTeachersAll.filter((teacher) => {
          return teacher.teach_price_an_hour == inputPrice;
        });
      }
      if (
        inputSubject != 0 &&
        inputValoration != 0 &&
        inputExperience == 0 &&
        inputPrice == 0
      ) {
        this.arrTeachers = this.arrTeachersAll.filter((teacher) => {
          return (
            teacher.teach_id_subject == inputSubject &&
            this.getTeacherAverage(teacher.teach_id) == inputValoration
          );
        });
      }

      if (
        inputSubject != 0 &&
        inputValoration != 0 &&
        inputExperience != 0 &&
        inputPrice == 0
      ) {
        this.arrTeachers = this.arrTeachersAll.filter((teacher) => {
          return (
            teacher.teach_id_subject == inputSubject &&
            this.getTeacherAverage(teacher.teach_id) == inputValoration &&
            teacher.teach_experience_years == inputExperience
          );
        });
      }

      if (
        inputSubject != 0 &&
        inputValoration == 0 &&
        inputExperience != 0 &&
        inputPrice == 0
      ) {
        this.arrTeachers = this.arrTeachersAll.filter((teacher) => {
          return (
            teacher.teach_id_subject == inputSubject &&
            teacher.teach_experience_years == inputExperience
          );
        });
      }

      if (
        inputSubject != 0 &&
        inputValoration != 0 &&
        inputExperience != 0 &&
        inputPrice != 0
      ) {
        this.arrTeachers = this.arrTeachersAll.filter((teacher) => {
          return (
            this.getTeacherAverage(teacher.teach_id) == inputValoration &&
            teacher.teach_id_subject == inputSubject &&
            teacher.teach_experience_years == inputExperience &&
            teacher.teach_price_an_hour == inputPrice
          );
        });
      }

      if (
        inputSubject != 0 &&
        inputValoration == 0 &&
        inputExperience == 0 &&
        inputPrice != 0
      ) {
        this.arrTeachers = this.arrTeachersAll.filter((teacher) => {
          return (
            teacher.teach_id_subject == inputSubject &&
            teacher.teach_price_an_hour == inputPrice
          );
        });
      }
    } catch (error) {
      console.log;
    }
  }

  //borra filtro de los teachers de las card
  async eraseFilterTeachers() {
    this.arrTeachers = await this.getTeachers();
    this.inputSubject = 0;
    this.inputValoration = 0;
    this.inputExperience = 0;
    this.inputPrice = 0;
    this.showFilterMateria = false;
    this.showFilterValoration = false;
    this.showFilterExperience = false;
    this.showFilterPrices = false;
  }
  //función para calcular la media de los assesments de los enrollments
  //para cada teacher filtro el enrollment
  getTeacherAverage(idTeacher: number) {
    try {
      this.enrolls = this.arrEnrollments.filter((e) => {
        return e.enroll_id_teacher === idTeacher;
      });

      let total = 0;

      this.enrolls.map(({ enroll_assessment }) => (total += enroll_assessment));
      let resultado = Math.round(total / this.enrolls.length);
      if (isNaN(resultado)) {
        resultado = 0;
      }

      return resultado;
    } catch (error) {
      return console.log(error);
    }
  }

  //location in MAP
  //sacamos coordenadas desde un zipCode
  getCoordinates(
    address: string,
    teacherName: string,
    teacherExperience: number,
    teacherIdSubject: number,
    teacherPrice: number
  ) {
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        address +
        '&key=' +
        environment.googleMaps.apiKey
    )
      .then((response) => response.json())
      .then((data) => {

        let random = (Math.random() - 0.5) * 2 / 100;
        const latitude = data.results[0].geometry.location.lat + random;
        const longitude = data.results[0].geometry.location.lng + random; 

        this.coordenadas.push({
          teacherName,
          teacherExperience,
          teacherIdSubject,
          teacherPrice,
          latitude,
          longitude,
        });

        return this.coordenadas;
      });
  }

  //coordenadas de todos los teachers y los datos necesarios para mostrar en el mapa
  async coords(): Promise<any> {
    const arrTeachersAll = await this.teachersService.getWithoutPages();
    const filterResp = this.arrTeachersAll.filter((teacher) => {
      return teacher.teach_validated === 'SI';
    });

    this.teachersWithCoords = filterResp;

    this.arrTeachers.forEach((teacher) => {
      this.getCoordinates(
        teacher.teach_zip,
        teacher.teach_name,
        teacher.teach_experience_years,
        teacher.teach_id_subject,
        teacher.teach_price_an_hour
      );
    });
  }

  checkToken(){
    const tokenValue = localStorage.getItem('user-token');
    if (tokenValue) this.token = true;
  }
}
