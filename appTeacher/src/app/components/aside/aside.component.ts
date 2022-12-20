import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  RouteConfigLoadEnd,
  Router,
  UrlSegment,
} from '@angular/router';
import { Admin } from 'src/app/interfaces/admin.interface';
import { Student } from 'src/app/interfaces/student.interface';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  rolAdmin: boolean = false;
  rolStudent: boolean = false;
  rolTeacher: boolean = false;
  btnText: string = '';
  userType: string = '';
  userId: string = '';
  routeAdmin: string = '';
  studentProfile: Student[] = [];
  teacherProfile: Teacher[] = [];
  adminProfile: Admin[] = [];
  myProfile: boolean;
  menuTeachers: boolean;
  menuStudents: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private teachersService: TeachersService,
    private studentsService: StudentsService
  ) {
    this.myProfile = false;
    this.menuTeachers = false;
    this.menuStudents = false;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userType = params.userType;
      this.userId = params.userId;
      this.activatedRoute.url.subscribe((url) => {
        this.routeAdmin = url[3].path;
      });
      //panel en caso de ser alumno
      if (this.userType === 'alumno') {
        this.btnText = 'Tu matrícula';
        this.rolStudent = true;
        this.getStudent(this.userId);
      }

      //panel en caso de ser admin
      if (this.userType === 'admin' || this.routeAdmin === 'students') {
        this.rolAdmin = true;
        this.btnText = 'Profesores';
      }
      if (this.userType === 'admin' && this.routeAdmin === 'students') {
        this.rolAdmin = true;
        this.btnText = 'Profesores';
      }

      //panel en caso de ser profesor
      if (this.userType === 'profesor') {
        this.rolTeacher = true;
        this.btnText = 'Alumnos';
        this.getTeacher(this.userId);
      }
    });
  }

  //me traigo el teacher con el id de la URL
  async getTeacher(id: string) {
    try {
      const teacher = await this.teachersService.getTeacher(parseInt(id));
      this.teacherProfile = teacher;
      // console.log(this.teacherProfile);
      return this.teacherProfile;
    } catch (error) {
      return console.log(error);
    }
  }
  //me traigo el student con el id de la URL
  async getStudent(id: string) {
    try {
      const student = await this.studentsService.getStudent(parseInt(id));
      this.studentProfile = student[0];
      return this.studentProfile[0];
    } catch (error) {
      return console.log(error);
    }
  }
  getAdmin(id: number) {}

  //ir a valoracion del teacher. sólo funciona si eres de tipo alumno.
  valorationNavigate() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userType = params.userType;
      this.userId = params.userId;
    });

    this.router.navigate([`/area/${this.userType}/${this.userId}/valoration`]);
  }

  goToProfile() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userType = params.userType;
      this.userId = params.userId;
    });
    // console.log(this.myProfile);
    this.router.navigate([`/area/${this.userType}/${this.userId}/myProfile`]);
    this.myProfile = !this.myProfile; //true
  }

  adminNavigate() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userType = params.userType;
      this.userId = params.userId;
    });

    this.router.navigate([`/area/admin/${this.userId}/students`]);
  }
  userNavigate() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userType = params.userType;
      this.userId = params.userId;
    });
    this.myProfile = !this.myProfile;
    this.router.navigate([`/area/${this.userType}/${this.userId}`]);
  }
  
  logOut(){
    localStorage.removeItem('user-token');
    this.router.navigate(['/map'])
  }
}
