import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enrollment } from 'src/app/interfaces/enrollment.interface';
import { Student } from 'src/app/interfaces/student.interface';
import { Subject } from 'src/app/interfaces/subject.interface';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { EnrollmentsService } from 'src/app/services/enrollments.service';
import { StudentsService } from 'src/app/services/students.service';
import { SubjectsService } from 'src/app/services/subjects.service';
import { TeachersService } from 'src/app/services/teachers.service';
const bootstrap = require('bootstrap');

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.scss'],
})
export class AdminStudentsComponent implements OnInit {
  rolAdmin = 'true';
  userId: number = 0;
  action: string = '¿Qué quieres hacer?'; //validar o eliminar profesor
  studentToValidate: number = 0;

  //filter inputs
  inputName: string = '';
  inputCity: string = '';
  inputZip: string = '';
  inputSubject: string = '';
  inputActive: string = '';

  //arrays
  student!: Student;
  enrolls: Enrollment[] = [];
  studentEnroll: Student[] = [];
  arrTeachers: Teacher[] = [];
  arrSubjects: Subject[] = [];
  arrStudents: Student[] = [];
  arrEnrollments: Enrollment[] = [];

  //pages
  offset: number = 0;
  cant: number = 8;

  //modal
  getModalTitle: string = '';
  getModalBody: string = '';
  getModalImg: string = '';
  getModalRoute: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private teachersService: TeachersService,
    private studentsService: StudentsService,
    private subjectsService: SubjectsService,
    private enrollmentsService: EnrollmentsService
  ) {}

  ngOnInit(): void {
    //traigo datos de la API y los guardo en arrays
    this.getSubjects();
    // this.getTeachers();
    this.getStudents();
    // this.getEnrollments();
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params.userId;
    });
  }

  async getTeachers() {
    try {
      const arrTeachers = await this.teachersService.getAll(
        this.offset,
        this.cant
      );
      return (this.arrTeachers = arrTeachers);
    } catch (error) {
      console.log(error);
    }
  }
  // traigo las subjects
  async getSubjects() {
    try {
      const response = await this.subjectsService.getAll();

      return (this.arrSubjects = response);
    } catch (error) {
      console.log(error);
    }
  }
  //traigo los students
  async getStudents() {
    try {
      const response = await this.studentsService.getAll();

      return (this.arrStudents = response[0]);
    } catch (error) {
      return console.log(error);
    }
  }
  //traigo los enrollments
  async getEnrollments(): Promise<void> {
    try {
      const response = await this.enrollmentsService.getEnrollments();

      this.arrEnrollments = response;
    } catch (error) {
      return console.log(error);
    }
  }

  async filterStudents(inputName: string, inputActive: string) {
    try {
      //filtro solo por name
      if (inputName != '' && inputActive == '') {
        this.arrStudents = this.arrStudents.filter((s) => {
          return s.student_name.includes(this.inputName);
        });
      }

      //filtro solo por estado: activo SI o NO
      if (inputName == '' && inputActive != '') {
        this.arrStudents = this.arrStudents.filter((s) => {
          return s.user_deleted == this.inputActive;
        });
      }
      //filtro por ambos
      if (inputName != '' && inputActive != '') {
        this.arrStudents = this.arrStudents.filter((s) => {
          return (
            s.student_name.includes(this.inputName) &&
            s.user_deleted == this.inputActive
          );
        });
      }
    } catch (error) {
      return console.log(error);
    }
  }

  async eraseFilterStudent() {
    try {
      await this.getEnrollments();
      this.arrStudents = await this.getStudents();

      this.inputName = '';
    } catch (error) {
      return console.log(error);
    }
  }

  //dar de baja o de alta a un alumno
  //lo hacen los admin

  async validateStudent(studentToValidate: number) {
    try {
      const response = await this.studentsService.getStudent(studentToValidate);
      const student = response[0];
      if (this.action == 'alta') {
        student[0].user_deleted = 'NO';
      }
      if (this.action == 'baja') {
        student[0].user_deleted = 'SI';
      }
      const studentUpdated = await this.studentsService.updateStudent(
        student[0].student_id,
        student[0]
      );
      this.setModal(true, student[0]);
    } catch (error) {
      this.setModal(false, this.student);
      return console.log(error);
    }
  }

  setModal(ok: boolean, student: Student): void {
    let modal = new bootstrap.Modal(document.getElementById('popUp'), {
      keyboard: false,
    });
    if (ok) {
      //OK
      if (this.action === 'alta') {
        //DAR DE ALTA
        this.getModalTitle = 'Alumno dado de alta';
        this.getModalImg = 'assets/images/PopUp/PopUpProfesorAprobar.png';
      } else {
        //DAR DE BAJA
        this.getModalTitle = 'Alumno dado de baja';
        this.getModalImg = 'assets/images/PopUp/PopUpProfesorEliminar.png';
      }
      this.getModalBody =
        '<p><b>Nombre: </b> ' +
        student.student_name +
        ' ' +
        student.student_last_name +
        '<br>' +
        '<b>Email: </b> ' +
        student.user_email +
        '<br>' +
        '<b>Teléfono: </b> ' +
        student.student_phone +
        '</p>';
    } else {
      //ERROR
      this.getModalTitle = 'Ups! <br> Algo ha ido mal...';
      this.getModalBody = '¡Lo sentimos! <br> Vuelve a intentarlo más tarde.';
      this.getModalImg = 'assets/images/PopUp/PopUpError.png';
    }
    this.getModalRoute = `/area/admin/${this.userId}/students`;
    modal.show();
  }
  closeModal() {
    window.location.reload();
    return this.router.navigate([`/area/admin/${this.userId}/students`]);
  }
}
