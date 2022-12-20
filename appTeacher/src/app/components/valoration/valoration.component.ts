import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { offset } from '@popperjs/core';
import { Enrollment } from 'src/app/interfaces/enrollment.interface';
import { Student } from 'src/app/interfaces/student.interface';
import { Subject } from 'src/app/interfaces/subject.interface';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { EnrollmentsService } from 'src/app/services/enrollments.service';
import { StudentsService } from 'src/app/services/students.service';
import { SubjectsService } from 'src/app/services/subjects.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-valoration',
  templateUrl: './valoration.component.html',
  styleUrls: ['./valoration.component.scss'],
})
export class ValorationComponent implements OnInit {
  activo: boolean = false;
  student: Student[] = [];
  idStudent: number = 0;
  userId: number = 0;
  starPath: string = './assets/images/star.svg';
  finalValoration: string = '0';
  //arrays
  studentEnrolls: Enrollment[] = [];
  arrTeachers: Teacher[] = [];
  arrSubjects: Subject[] = [];

  //pages
  offset: number = 0;
  cant: number = 8;
  page: number = 1;

  teacherCity: string = '';
  teacherExperience: number = 0;
  teacherZip: string = '';
  enrollToUpdate: number = 0;
  comment: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private teachersService: TeachersService,
    private studentsService: StudentsService,
    private subjectsService: SubjectsService,
    private enrollmentsService: EnrollmentsService
  ) {}

  ngOnInit(): void {
    this.getTeachers();
    this.getSubjects();
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = parseInt(params.userId);
      //traigo el student y sus enrollment
      this.getStudentById(this.userId);
    });
  }
  openModal() {
    console.log(this.enrollToUpdate);
    const popup: any = document.getElementById('myPopup');
    this.activo = true;
  }
  close() {
    this.activo = false;
    this.router.navigate([`/area/alumno/${this.userId}/valoration`]);
  }
  //pagination
  previousPagination() {
    this.offset -= 9;
    this.page = this.offset / 9 + 1;
    this.getTeachers();
  }

  nextPagination() {
    this.offset += 9;
    this.page = this.offset / 9 + 1;
    this.getTeachers();
    // console.log(this.offset);
    // let final = this.arrTeachersAll.length;
    // let finalPage = Math.ceil(final / 8);
    // console.log(final, finalPage);
  }
  //traigo al student
  async getStudentById(id: number) {
    try {
      const response = await this.studentsService.getStudent(id);
      this.student = response[0];
      this.idStudent = Number(this.student[0].student_id);
      this.getStudentEnrolls(this.idStudent);

      return this.student[0];
    } catch (error) {
      return console.log(error);
    }
  }

  //traigo los enrollments del Student
  async getStudentEnrolls(id: number) {
    this.studentEnrolls =
      await this.enrollmentsService.getEnrollmentByIdStudent(id);
    return this.studentEnrolls;
  }

  //traigo los datos de cada teacher de los enrollments del student.
  async getTeachers() {
    try {
      const arrTeachers = await this.teachersService.getWithoutPages();

      return (this.arrTeachers = arrTeachers);
    } catch (error) {
      console.log(error);
    }
  }
  //traigo las subjects
  async getSubjects() {
    try {
      const response = await this.subjectsService.getAll();

      return (this.arrSubjects = response);
    } catch (error) {
      console.log(error);
    }
  }
  //teacher name del enrollment
  findTeacherEnrollName(idTeacher: number) {
    try {
      const teacherEnroll = this.arrTeachers.filter((e) => {
        return e.teach_id === idTeacher;
      });
      const teacherName = teacherEnroll[0].teach_name;
      this.teacherCity = teacherEnroll[0].teach_city;
      this.teacherExperience = teacherEnroll[0].teach_experience_years;
      this.teacherZip = teacherEnroll[0].teach_zip;
      return teacherName;
    } catch (error) {
      return console.log(error);
    }
  }
  //trae el nombre de la subject que imparte el teacher
  //que tiene el alumno en el enrollment

  findTeacherEnrollSubject(idTeacher: number) {
    try {
      const teacherEnroll = this.arrTeachers.filter((e) => {
        return e.teach_id === idTeacher;
      });
      const subjectId = teacherEnroll[0].teach_id_subject;

      const subjectName = this.findSubject(subjectId);

      return subjectName;
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

  async valorateTeacher() {
    try {
      //me traigo el enroll a modificar

      const response = await this.enrollmentsService.getEnrollmentById(
        this.enrollToUpdate
      );
      const enrollment = response[0];

      //ahora modifico el enroll
      enrollment.enroll_comments = this.comment;
      enrollment.enroll_assessment = parseInt(this.finalValoration);

      const enrollUpdated = await this.enrollmentsService.updateEnrollment(
        this.enrollToUpdate,
        enrollment
      );
      this.close();
      window.location.reload();
      this.router.navigate([`/area/alumno/${this.userId}/valoration`]);
    } catch (error) {
      console.log(error);
    }
  }
  //recoge la estrella que selecciono el usuario para dar puntuación
  rating($event: any) {
    this.finalValoration = $event.srcElement.value;
  }
}
