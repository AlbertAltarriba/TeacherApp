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
  selector: 'app-private-area',
  templateUrl: './private-area.component.html',
  styleUrls: ['./private-area.component.scss'],
})
export class PrivateAreaComponent implements OnInit {
  areaTitle: string = 'Encuentra tu alumno';
  actionText: string = 'Aplicar cambio';
  activo: boolean = false;
  teacherId: number = 0;
  teacherSelect: string = 'default';
  teacher!: Teacher;
  adminSelect: string = 'default';
  isDisabledProfesor: Boolean = true;
  isDisabledAdmin: Boolean = true;
  subject: string = 'Materia';
  selected: boolean = false;
  action: string = '¿Qué quieres hacer?'; //validar o eliminar profesor
  teacherToValidate: number = 0; //recupera el teacher que queremos modificar
  studentToValidate: number = 0; //recupera el student que queremos modificar
  enrollToValidate: number = 0; //recupera el enrollment que queremos modificar
  teacherToEnroll: number = 0; //recupera el teacher que queremos matricular

  //user data
  userType: string = '';
  userId: number = 0;

  //filter inputs
  inputName: string = '';
  inputCity: string = '';
  inputZip: string = '';
  inputSubject: string = '';
  inputActive: string = '';

  //student data
  studentName: string = '';
  studentCity: string = '';
  studentZip: string = '';
  studentPhone: string = '';
  studentLastName: string = '';
  studentMail: string = '';

  //roles
  rolAdmin: boolean = false;
  rolStudent: boolean = false;
  rolTeacher: boolean = false;

  //arrays
  student: Student[] = [];
  enrolls: Enrollment[] = [];
  studentEnroll: Student[] = [];
  arrTeachers: Teacher[] = [];
  arrTeachersAll: Teacher[] = [];
  arrSubjects: Subject[] = [];
  arrStudents: Student[] = [];
  arrEnrollments: Enrollment[] = [];

  //pages
  offset: number = 0;
  cant: number = 8;
  currentPage: number = 1;
  num_pages: number = 1;
  length: number = 0;

  //modal
  getModalTitle: string = '';
  getModalBody: string = '';
  getModalImg: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private teachersService: TeachersService,
    private studentsService: StudentsService,
    private subjectsService: SubjectsService,
    private enrollmentsService: EnrollmentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //traigo datos de la API y los guardo en arrays
    this.getSubjects();
    this.getTeachers();
    this.getTeachersToAdmin();
    this.getStudents();
    this.getEnrollments();

    //route subscribe
    this.activatedRoute.params.subscribe((params: any) => {
      this.userType = params.userType;
      this.userId = parseInt(params.userId);
      // console.log(params);
      //panel en caso de ser alumno
      if (this.userType === 'alumno') {
        this.areaTitle = 'Encuentra al profesor que buscas';

        this.actionText = 'Realizar matrícula';
        this.rolStudent = true;
        //traigo el alumno a partir del idUser de la ruta.
        this.getStudentById(this.userId);
      }
      //panel en caso de ser profesor
      if (this.userType === 'profesor') {
        this.rolTeacher = true;
        //traigo el teacher a partir del idUser de la ruta.
        this.getTeacher(this.userId);
      }
      //panel en caso de ser admin
      if (this.userType === 'admin') {
        this.rolAdmin = true;
        this.areaTitle = 'Panel del administrador';
      }
    });
  }

  onSelectedProfesor(value: string): void {
    this.teacherSelect = value;
    value !== 'default'
      ? (this.isDisabledProfesor = false)
      : (this.isDisabledProfesor = true);
  }

  onSelectedAdmin(value: string): void {
    this.adminSelect = value;
    value !== 'default'
      ? (this.isDisabledAdmin = false)
      : (this.isDisabledAdmin = true);
  }
  //pagination
  previousPagination() {
    this.currentPage = this.currentPage - 1;

    console.log(this.currentPage);
    if (this.currentPage >= 1) {
      this.offset -= 8;
      this.getTeachersToAdmin();
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
      this.getTeachersToAdmin();
    } else {
      this.currentPage = this.num_pages;
    }
  }

  calculateLastPage() {
    console.log(this.length);
    let limit = 8;
    // let num_pages;
    if ((this.length / limit) % 1 != 0) {
      this.num_pages = Math.trunc(this.length / limit) + 1;
    } else {
      this.num_pages = this.length / limit;
    }

    return this.num_pages;
  }
  //*********GENERAL GETS -- TEACHERS -ENROLLMENTS - SUBJECTS**********************

  //traigo teachers

  async getTeachers(): Promise<any> {
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
  async getTeachersToAdmin(): Promise<any> {
    try {
      const arrTeachers = await this.teachersService.getWithoutPages();
      this.arrTeachersAll = arrTeachers;

      return this.arrTeachersAll;
    } catch (error) {
      console.log(error);
    }
  }
  // traigo las subjects
  async getSubjects() {
    try {
      const response = await this.subjectsService.getAll();
      if (response[0].subj_id) {
        return (this.arrSubjects = response);
      }
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
  //************************FIN GENERAL GETS************************************

  //*****************GETS POR ID*********************************************** */
  //traigo profe por su id
  async getTeacher(userId: number): Promise<void> {
    try {
      const teacher = await this.teachersService.getTeacher(userId);
      this.teacherId = teacher[0].teach_id;
      this.getTeacherEnrolls(this.teacherId);
    } catch (error) {
      console.log(error);
    }
  }

  //traigo el alumno por su id
  async getStudentById(id: number) {
    try {
      const response = await this.studentsService.getStudent(id);
      this.student = response[0];

      return this.student[0];
    } catch (error) {
      return console.log(error);
    }
  }
  //traigo el subject name en función de su id
  findSubject(id: number) {
    try {
      const subjectName = this.arrSubjects.filter((s) => {
        return s.subj_id === id;
      });

      return subjectName[0].subj_name;
    } catch (error) {
      return console.log(error);
    }
  }

  //me traigo los enrollments del profesor
  getTeacherEnrolls(idTeacher: number) {
    try {
      this.enrolls = this.arrEnrollments.filter((e) => {
        return e.enroll_id_teacher === idTeacher;
      });
      return this.enrolls;
    } catch (error) {
      return console.log(error);
    }
  }

  //datos de los student de los enroll asociados al teacher.

  findStudentEnroll(idStudent: number) {
    try {
      this.studentEnroll = this.arrStudents.filter((e) => {
        return e.student_id === idStudent;
      });
      // debugger;
      this.studentName = this.studentEnroll[0].student_name;
      this.studentCity = this.studentEnroll[0].student_city;
      this.studentPhone = this.studentEnroll[0].student_phone;
      this.studentZip = this.studentEnroll[0].student_zip;
      this.studentMail = this.studentEnroll[0].user_email;

      return this.studentName;
    } catch (error) {
      return console.log(error);
    }
  }

  //*******************FILTERS DE LOS INPUTS****************** */
  //nuevo filtro
  async filterTeachers(
    inputName: string,
    inputCity: string,
    inputZip: string,
    inputSubject: string
  ) {
    try {
      if (this.rolAdmin == true || this.rolStudent == true) {
        this.arrTeachersAll = await this.getTeachersToAdmin();
        this.arrTeachersAll = this.arrTeachersAll.filter((t) => {
          //UN FILTRO DE CADA OPCIÓN
          if (
            inputName != '' &&
            inputCity == '' &&
            inputZip == '' &&
            inputSubject == ''
          ) {
            return t.teach_name.includes(this.inputName);
          }
          if (
            inputName == '' &&
            inputCity != '' &&
            inputZip == '' &&
            inputSubject == ''
          ) {
            return t.teach_city.includes(this.inputCity);
          }
          if (
            inputName == '' &&
            inputCity == '' &&
            inputZip != '' &&
            inputSubject == ''
          ) {
            return t.teach_zip.includes(this.inputZip);
          }
          if (
            inputName == '' &&
            inputCity == '' &&
            inputZip == '' &&
            inputSubject != ''
          ) {
            return t.teach_id_subject === parseInt(inputSubject);
          }
          //FILTRO DE DOS OPCIONES
          if (
            inputName != '' &&
            inputCity != '' &&
            inputZip == '' &&
            inputSubject == ''
          ) {
            return (
              t.teach_name.includes(this.inputName) &&
              t.teach_city.includes(this.inputCity)
            );
          }
          if (
            inputName != '' &&
            inputCity == '' &&
            inputZip != '' &&
            inputSubject == ''
          ) {
            return (
              t.teach_name.includes(this.inputName) &&
              t.teach_zip.includes(this.inputZip)
            );
          }
          if (
            inputName != '' &&
            inputCity == '' &&
            inputZip == '' &&
            inputSubject != ''
          ) {
            return (
              t.teach_name.includes(this.inputName) &&
              t.teach_id_subject === parseInt(inputSubject)
            );
          }
          if (
            inputName == '' &&
            inputCity != '' &&
            inputZip != '' &&
            inputSubject == ''
          ) {
            return (
              t.teach_city.includes(this.inputCity) &&
              t.teach_zip.includes(this.inputZip)
            );
          }

          //FILTRO DE TRES OPCIONES
          if (
            inputName != '' &&
            inputCity != '' &&
            inputZip != '' &&
            inputSubject == ''
          ) {
            return (
              t.teach_name.includes(this.inputName) &&
              t.teach_city.includes(this.inputCity) &&
              t.teach_zip.includes(this.inputZip)
            );
          }
          if (
            inputName != '' &&
            inputCity != '' &&
            inputZip == '' &&
            inputSubject != ''
          ) {
            return (
              t.teach_name.includes(this.inputName) &&
              t.teach_city.includes(this.inputCity) &&
              t.teach_id_subject === parseInt(inputSubject)
            );
          }
          if (
            inputName != '' &&
            inputCity == '' &&
            inputZip != '' &&
            inputSubject != ''
          ) {
            return (
              t.teach_name.includes(this.inputName) &&
              t.teach_zip.includes(this.inputZip) &&
              t.teach_id_subject === parseInt(inputSubject)
            );
          }
          if (
            inputName == '' &&
            inputCity != '' &&
            inputZip != '' &&
            inputSubject != ''
          ) {
            return (
              t.teach_city.includes(this.inputCity) &&
              t.teach_zip.includes(this.inputZip) &&
              t.teach_id_subject === parseInt(inputSubject)
            );
          }

          //FILTRO CON TODAS LAS OPCIONES
          return (
            t.teach_name.includes(this.inputName) &&
            t.teach_city.includes(this.inputCity) &&
            t.teach_zip.includes(this.inputZip) &&
            t.teach_id_subject === parseInt(inputSubject)
          );
        });
      } else {
        this.arrTeachers = await this.getTeachers();
        this.arrTeachers = this.arrTeachers.filter((t) => {
          //UN FILTRO DE CADA OPCIÓN
          if (
            inputName != '' &&
            inputCity == '' &&
            inputZip == '' &&
            inputSubject == ''
          ) {
            return t.teach_name.includes(this.inputName);
          }
          if (
            inputName == '' &&
            inputCity != '' &&
            inputZip == '' &&
            inputSubject == ''
          ) {
            return t.teach_city.includes(this.inputCity);
          }
          if (
            inputName == '' &&
            inputCity == '' &&
            inputZip != '' &&
            inputSubject == ''
          ) {
            return t.teach_zip.includes(this.inputZip);
          }
          if (
            inputName == '' &&
            inputCity == '' &&
            inputZip == '' &&
            inputSubject != ''
          ) {
            return t.teach_id_subject === parseInt(inputSubject);
          }
          //FILTRO DE DOS OPCIONES
          if (
            inputName != '' &&
            inputCity != '' &&
            inputZip == '' &&
            inputSubject == ''
          ) {
            return (
              t.teach_name.includes(this.inputName) &&
              t.teach_city.includes(this.inputCity)
            );
          }
          if (
            inputName != '' &&
            inputCity == '' &&
            inputZip != '' &&
            inputSubject == ''
          ) {
            return (
              t.teach_name.includes(this.inputName) &&
              t.teach_zip.includes(this.inputZip)
            );
          }
          if (
            inputName != '' &&
            inputCity == '' &&
            inputZip == '' &&
            inputSubject != ''
          ) {
            return (
              t.teach_name.includes(this.inputName) &&
              t.teach_id_subject === parseInt(inputSubject)
            );
          }
          if (
            inputName == '' &&
            inputCity != '' &&
            inputZip != '' &&
            inputSubject == ''
          ) {
            return (
              t.teach_city.includes(this.inputCity) &&
              t.teach_zip.includes(this.inputZip)
            );
          }

          //FILTRO DE TRES OPCIONES
          if (
            inputName != '' &&
            inputCity != '' &&
            inputZip != '' &&
            inputSubject == ''
          ) {
            return (
              t.teach_name.includes(this.inputName) &&
              t.teach_city.includes(this.inputCity) &&
              t.teach_zip.includes(this.inputZip)
            );
          }
          if (
            inputName != '' &&
            inputCity != '' &&
            inputZip == '' &&
            inputSubject != ''
          ) {
            return (
              t.teach_name.includes(this.inputName) &&
              t.teach_city.includes(this.inputCity) &&
              t.teach_id_subject === parseInt(inputSubject)
            );
          }
          if (
            inputName != '' &&
            inputCity == '' &&
            inputZip != '' &&
            inputSubject != ''
          ) {
            return (
              t.teach_name.includes(this.inputName) &&
              t.teach_zip.includes(this.inputZip) &&
              t.teach_id_subject === parseInt(inputSubject)
            );
          }
          if (
            inputName == '' &&
            inputCity != '' &&
            inputZip != '' &&
            inputSubject != ''
          ) {
            return (
              t.teach_city.includes(this.inputCity) &&
              t.teach_zip.includes(this.inputZip) &&
              t.teach_id_subject === parseInt(inputSubject)
            );
          }

          //FILTRO CON TODAS LAS OPCIONES
          return (
            t.teach_name.includes(this.inputName) &&
            t.teach_city.includes(this.inputCity) &&
            t.teach_zip.includes(this.inputZip) &&
            t.teach_id_subject === parseInt(inputSubject)
          );
        });
      }
    } catch (error) {
      return console.log(error);
    }
  }
  //borro el filtro de teachers
  async eraseFilterTeacher() {
    try {
      this.inputSubject = '';
      this.inputName = '';
      this.inputCity = '';
      this.inputZip = '';
      if (this.rolAdmin == true || this.rolStudent == true) {
        const response = await this.getTeachersToAdmin();

        return (this.arrTeachersAll = response);
      } else {
        const response = await this.getTeachers();
        return (this.arrTeachers = response);
      }
    } catch (error) {
      return console.log(error);
    }
  }

  async filterStudents(inputName: string, inputActive: string) {
    try {
      //me traigo el student que quiere filtrar el teacher

      if (inputName != '' && inputActive == '') {
        this.arrStudents = this.arrStudents.filter((s) => {
          return s.student_name.includes(this.inputName);
        });
        //busco los datos del student filtrado
        this.findStudentEnroll(Number(this.arrStudents[0].student_id));
        //traigo los enrollments del usuario filtrado con el teacher
        this.enrolls = this.enrolls.filter((e) => {
          return e.enroll_id_student === this.studentEnroll[0].student_id;
        });
      }
      if (inputName == '' && inputActive != '') {
        this.enrolls = this.enrolls.filter((e) => {
          return e.enroll_deleted === this.inputActive;
        });
      }

      this.arrStudents = this.arrStudents.filter((s) => {
        return s.student_name.includes(this.inputName);
      });
      if (inputName != '' && inputActive != '') {
        this.findStudentEnroll(Number(this.arrStudents[0].student_id));
        //traigo los enrollments del usuario filtrado con el teacher
        this.enrolls = this.enrolls.filter((e) => {
          return (
            e.enroll_id_student === this.studentEnroll[0].student_id &&
            e.enroll_deleted === this.inputActive
          );
        });
      }
      //busco los datos del student filtrado
    } catch (error) {
      return console.log(error);
    }
  }

  async eraseFilterStudent() {
    try {
      await this.getEnrollments();
      this.arrStudents = await this.getStudents();

      await this.getTeacherEnrolls(this.userId);

      this.inputName = '';
      this.inputActive = '';
    } catch (error) {
      return console.log(error);
    }
  }

  //mètodos para el ADMIN
  async filterTeacherToValidate($event: any) {
    try {
      if ($event.target.checked) {
        this.arrTeachersAll = this.arrTeachersAll.filter((t) => {
          return t.teach_validated === 'NO';
        });
      } else {
        this.arrTeachersAll = await this.getTeachersToAdmin();
      }
    } catch (error) {
      return console.log(error);
    }
  }

  sortTeachers($event: any) {
    const order = $event.target.value;
    console.log(order);
    this.arrTeachersAll.sort((x, y) => {
      if (order === 'experience') {
        return x.teach_experience_years - y.teach_experience_years;
      } else {
        return x.teach_price_an_hour - y.teach_price_an_hour;
      }
    });
  }

  createTeacher(teacher: Teacher, validate: string, id: string): FormData {
    let fd = new FormData();
    fd.append('teach_name', teacher.teach_name);
    fd.append('teach_id', id);
    fd.append('teach_last_name', teacher.teach_last_name);
    fd.append('teach_address', teacher.teach_address);
    fd.append('teach_city', teacher.teach_city);
    fd.append('teach_zip', teacher.teach_zip);
    fd.append('teach_phone', teacher.teach_phone);
    fd.append('teach_image', '');
    fd.append('teach_description', teacher.teach_description);
    fd.append(
      'teach_experience_years',
      teacher.teach_experience_years.toString()
    );
    fd.append('teach_price_an_hour', teacher.teach_price_an_hour.toString());
    fd.append('teach_validated', validate);
    fd.append('teach_id_subject', teacher.teach_id_subject.toString());
    fd.append('teach_id_user', teacher.teach_id_user.toString());
    fd.append('user_deleted', teacher.user_deleted);
    fd.append('user_email', teacher.user_email);
    fd.append('user_id', teacher.user_id.toString());
    fd.append('user_password', teacher.user_password);
    fd.append('user_type', teacher.user_type);

    return fd;
  }

  //VALIDAR UN PROFESOR. Lo hacen los admin. --> selecionar el checkbox y pinchar el profe de la tabla.
  async validateTeacher(teacherToValidate: number) {
    console.log(this.teacherToValidate);
    console.log(this.adminSelect);
    const teacherResponse = await this.teachersService.getTeacher(
      teacherToValidate
    );
    this.teacher = teacherResponse[0];

    if (this.adminSelect === 'validar') {
      try {
        const teacher = this.createTeacher(
          this.teacher,
          'SI',
          teacherToValidate.toString()
        );
        await this.teachersService.update(teacher, teacherToValidate);
        this.setModal(true);
      } catch (error) {
        console.log(error);
        this.setModal(false);
      }
    }

    //si se elimina una baja lógica de teacher--> validate a NO
    else if (this.adminSelect == 'eliminar') {
      try {
        const teacher = this.createTeacher(
          this.teacher,
          'NO',
          teacherToValidate.toString()
        );
        await this.teachersService.update(teacher, teacherToValidate);
        this.setModal(true);
      } catch (error) {
        console.log(error);
        this.setModal(false);
      }
    }
  }

  //APROBAR O ELIMINAR UNA MATRÍCULA --> LO HACEN LOS PROFESORES

  async validateEnroll(enrollToValidate: number) {
    console.log(this.action, enrollToValidate);
    try {
      //traerme el enroll
      const response = await this.enrollmentsService.getEnrollmentById(
        enrollToValidate
      );
      const enrollment = response[0];

      if (this.action == 'aprobarEnroll') {
        enrollment.enroll_deleted = 'SI';
      }
      if (this.action == 'eliminarEnroll') {
        enrollment.enroll_deleted = 'NO';
      }

      const enrollmentUpdated = await this.enrollmentsService.updateEnrollment(
        enrollToValidate,
        enrollment
      );
      this.setModal(true);
    } catch (error) {
      console.log(error);
      this.setModal(false);
    }
    //
  }

  async postEnroll(id: number) {
    this.teacherId = id;
    const enroll: Enrollment = {
      enroll_start_date: null,
      enroll_end_date: null,
      enroll_comments: '',
      enroll_assessment: 0,
      enroll_id_student: this.userId,
      enroll_id_teacher: this.teacherId,
      enroll_deleted: 'NO',
    };
    try {
      await this.enrollmentsService.createEnroll(enroll);
      this.setModal(true);
    } catch (error) {
      console.log(error);
      this.setModal(false);
    }
  }

  async setModal(ok: boolean) {
    let modal = new bootstrap.Modal(document.getElementById('popUp'), {
      keyboard: false,
    });
    if (ok) {
      //OK
      if (this.userType === 'profesor') {
        //PROFESOR
        if (this.action === 'aprobarEnroll') {
          //DAR DE ALTA
          this.getModalTitle = 'Has aprobado la matrícula';
          this.getModalImg = 'assets/images/PopUp/PopUpProfesorAprobar.png';
        } else {
          //DAR DE BAJA
          this.getModalTitle = 'Has eliminado la matrícula';
          this.getModalImg = 'assets/images/PopUp/PopUpProfesorEliminar.png';
        }
        this.getModalBody =
          '<p><b>Nombre: </b> ' +
          this.studentName +
          this.studentLastName +
          '<br>' +
          '<b>Email: </b> ' +
          this.studentMail +
          '<br>' +
          '<b>Teléfono: </b> ' +
          this.studentPhone +
          '</p>';
      } else if (this.userType === 'alumno') {
        //ALUMNO
        const teacher = await this.teachersService.getTeacher(this.teacherId);
        let teach = teacher[0];
        let subject = await this.subjectsService.getSubject(
          teach.teach_id_subject
        );

        this.getModalTitle = 'Has realizado la matrícula';
        this.getModalImg = 'assets/images/PopUp/PopUpAlumno.png';
        this.getModalBody = `<p><b>Materia: </b> ${subject[0].subj_name}<br>
          <b>Profesor: </b> ${teach.teach_name} ${teach.teach_last_name}<br>
          <b>Email: </b> ${teach.user_email}</p>`;
      } else {
        //ADMIN
        if (this.adminSelect === 'validar') {
          //VALIDAR
          this.getModalTitle = 'Has validado al profesor';
          this.getModalImg = 'assets/images/PopUp/PopUpAdminValidar.png';
        } else {
          //ELIMINAR
          this.getModalTitle = 'Has eliminado al profesor';
          this.getModalImg = 'assets/images/PopUp/PopUpAdminEliminar.png';
        }
        this.getModalBody =
          '<p><b>Nombre: </b> ' +
          this.teacher.teach_name +
          ' ' +
          this.teacher.teach_last_name +
          '<br>' +
          '<b>Email: </b> ' +
          this.teacher.user_email +
          '<br>' +
          '<b>Teléfono: </b> ' +
          this.teacher.teach_phone +
          '</p>';
      }
    } else {
      //ERROR
      this.getModalTitle = 'Ups! Algo ha ido mal...';
      this.getModalBody = '¡Lo sentimos! <br> Vuelve a intentarlo más tarde.';
      this.getModalImg = 'assets/images/PopUp/PopUpError.png';
    }
    modal.show();
  }
  closeModal() {
    window.location.reload();
  }
}
