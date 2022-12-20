import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Admin } from 'src/app/interfaces/admin.interface';
import { Student } from 'src/app/interfaces/student.interface';
import { Subject } from 'src/app/interfaces/subject.interface';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { User } from 'src/app/interfaces/user.interface';
import { AdminsService } from 'src/app/services/admins.service';
import { StudentsService } from 'src/app/services/students.service';
import { SubjectsService } from 'src/app/services/subjects.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { UsersService } from 'src/app/services/users.service';
const bootstrap = require('bootstrap');

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  registerForm: FormGroup;
  rol: String = "default";
  submitted: Boolean = false;
  arrMaterias: Subject[] = [];
  materiaSelect: string = "1";
  materiaName: string = "";
  idUser: Number = 0;
  id: number = 0;
  imageReq: string = "empty";
  edit: boolean = false;
  submitMessage: string = "Regístrate";
  userName: string = "";
  teacher!: Teacher;
  student!: Student;
  teachValidated: string = 'NO';
  imageRes: string = "";

  //modal controls
  getModalTitle: string = "";
  getModalBody: string = "";
  getModalImg: string = "";
  getModalRoute: string = "";
  getModalButton: string = "";

  constructor(
    private adminsService: AdminsService,
    private studentsService: StudentsService,
    private teachersService: TeachersService,
    private subjectsService: SubjectsService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.registerForm = new FormGroup({
      nombre: new FormControl('',[
        Validators.required,
        Validators.minLength(2)]),
      primer_apellido: new FormControl('',[
        Validators.required
      ]),
      segundo_apellido: new FormControl('',[]),
      direccion: new FormControl('',[
        Validators.required
      ]),
      ciudad: new FormControl('',[
        Validators.required
      ]),
      zip: new FormControl('',[
        Validators.required,
        Validators.pattern(/\d{5}/),
        Validators.maxLength(5)
      ]),
      email: new FormControl('',[
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      num_tel: new FormControl('',[
        Validators.required, 
        Validators.maxLength(13)
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]),
      password2: new FormControl('',[
         Validators.required
      ]),
      condiciones: new FormControl(false,[
        this.condicionesValidator
      ]),

    }, [this.passwordValidator])
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id: number = Number(params.userId);
      let type: string = params.userType;
      if(id){ //EDITANDO
        this.edit = true;
        this.id = id;
        this.submitMessage = "Actualiza";
        this.onRolChange(type);
        if(type==='profesor'){ //EDITA PROFESOR
          const response = await this.teachersService.getTeacher(id)
          this.teacher = response[0];
          this.idUser = this.teacher.user_id;
          this.teachValidated = this.teacher.teach_validated;
          this.getSubjectById(this.teacher.teach_id_subject);
          this.materiaSelect = this.teacher.teach_id_subject.toString();
          this.userName = `${this.teacher.teach_name} ${this.teacher.teach_last_name}`;
          this.imageRes = this.teacher.teach_image;

          this.registerForm.get('price')?.setValue(Number(this.teacher.teach_price_an_hour));
          this.registerForm.get('price')?.setValue(Number(this.teacher.teach_price_an_hour));
          this.registerForm.get('experiencia')?.setValue(this.teacher.teach_experience_years);
          this.registerForm.get('descripcion')?.setValue(this.teacher.teach_description);
          this.registerForm.get('nombre')?.setValue(this.teacher.teach_name);
          this.registerForm.get('primer_apellido')?.setValue(this.teacher.teach_last_name.split(' ')[0]);
          this.registerForm.get('segundo_apellido')?.setValue(this.teacher.teach_last_name.split(' ')[1]);
          this.registerForm.get('direccion')?.setValue(this.teacher.teach_address);
          this.registerForm.get('ciudad')?.setValue(this.teacher.teach_city);
          this.registerForm.get('zip')?.setValue(this.teacher.teach_zip);
          this.registerForm.get('email')?.setValue(this.teacher.user_email);
          this.registerForm.get('num_tel')?.setValue(this.teacher.teach_phone);
          this.registerForm.get('password')?.setValue(this.teacher.user_password);
          this.registerForm.get('password2')?.setValue(this.teacher.user_password);
        }
        else if(type==='alumno'){ //EDITA ALUMNO
          const response = await this.studentsService.getStudent(id);
          this.student = response[0][0];
          this.idUser = this.student.user_id;
          this.userName = `${this.student.student_name} ${this.student.student_last_name}`;

          this.registerForm.get('nombre')?.setValue(this.student.student_name);
          this.registerForm.get('primer_apellido')?.setValue(this.student.student_last_name.split(' ')[0]);
          this.registerForm.get('segundo_apellido')?.setValue(this.student.student_last_name.split(' ')[1]);
          this.registerForm.get('direccion')?.setValue(this.student.student_address);
          this.registerForm.get('ciudad')?.setValue(this.student.student_city);
          this.registerForm.get('zip')?.setValue(this.student.student_zip);
          this.registerForm.get('email')?.setValue(this.student.user_email);
          this.registerForm.get('num_tel')?.setValue(this.student.student_phone);
          this.registerForm.get('password')?.setValue(this.student.user_password);
          this.registerForm.get('password2')?.setValue(this.student.user_password);
        }
        else{ //EDITA ADMIN
          const response = await this.adminsService.getAdminById(id);
          let admin: Admin = response[0];
          this.idUser = admin.admin_id_user;
          this.userName = admin.admin_name;

          this.registerForm.get('nombre')?.setValue(admin.admin_name);
          this.registerForm.get('direccion')?.setValue(admin.admin_address);
          this.registerForm.get('ciudad')?.setValue(admin.admin_city);
          this.registerForm.get('zip')?.setValue(admin.admin_zip);
          this.registerForm.get('email')?.setValue(admin.user_email);
          this.registerForm.get('num_tel')?.setValue(admin.admin_phone);
          this.registerForm.get('password')?.setValue(admin.user_password);
          this.registerForm.get('password2')?.setValue(admin.user_password);
        }
      }
    })
  }

  async getSubjects() {
    this.arrMaterias = await this.subjectsService.getAll();
  }

  async getSubjectById(id: number){
    let response = await this.subjectsService.getSubject(id);
    this.materiaName = response[0].subj_name;
  }

  async postSubject(subj_name: string) {
    const subject: Subject = {subj_name};
    try {
      let response = await this.subjectsService.create(subject);
      this.materiaSelect = response.insertId;
    } catch (error) {
      this.setModal(false); // no se ha creado la materia
    }
  }

  // rellena objeto User para el POST/PUT a la API
  createUser(user_type: string): User{
    const user: User = {
      user_email: this.registerForm.value.email,
      user_password: this.registerForm.value.password,
      user_type,
      user_deleted: 'NO',
    };
    return user;
  }

  // rellena objeto Teacher para el POST/PUT a la API
  createTeacher(user:User): FormData{
    let fd= new FormData(); 
    console.log(this.imageReq)
      fd.append('teach_name', this.registerForm.value.nombre);
      fd.append('teach_id', this.id.toString());
      fd.append('teach_last_name', this.registerForm.value.primer_apellido + " " + this.registerForm.value.segundo_apellido);
      fd.append('teach_address', this.registerForm.value.direccion);
      fd.append('teach_city', this.registerForm.value.ciudad);
      fd.append('teach_zip', this.registerForm.value.zip);
      fd.append('teach_phone', this.registerForm.value.num_tel);
      fd.append('teach_image', this.imageReq[0]);
      fd.append('teach_description', this.registerForm.value.descripcion);
      fd.append('teach_experience_years', this.registerForm.value.experiencia);
      fd.append('teach_price_an_hour', this.registerForm.value.price);
      fd.append('teach_validated', this.teachValidated);
      fd.append('teach_id_subject', this.materiaSelect);
      fd.append('teach_id_user', this.idUser.toString());
      fd.append('user_deleted', user.user_deleted);
      fd.append('user_email', user.user_email);
      fd.append('user_id', this.idUser.toString());
      fd.append('user_password', user.user_password);
      fd.append('user_type', user.user_type);
      
    return fd;
  }

  // rellena objeto Student para el POST/PUT a la API 
  createStudent( user:User): Student{
    const student: Student = {
      student_id: this.id,
      student_name: this.registerForm.value.nombre,
      student_last_name: this.registerForm.value.primer_apellido + " " + this.registerForm.value.segundo_apellido,
      student_phone: this.registerForm.value.num_tel,
      student_city: this.registerForm.value.ciudad,
      student_address: this.registerForm.value.direccion,
      student_zip: this.registerForm.value.zip,
      student_id_user: Number(this.idUser),
      user_deleted: user.user_deleted,
      user_email: user.user_email,
      user_id: Number(this.idUser),
      user_password: user.user_password,
      user_type: user.user_type,
    };
    return student;
  }

  //Rellena objeto Admin para el put a la API
  createAdmin( user:User): Admin{
    const admin: Admin = {
      admin_id: this.id,
      admin_name: this.registerForm.value.nombre,
      admin_phone: this.registerForm.value.num_tel,
      admin_city: this.registerForm.value.ciudad,
      admin_address: this.registerForm.value.direccion,
      admin_zip: this.registerForm.value.zip,
      admin_id_user: Number(this.idUser),
      user_deleted: user.user_deleted,
      user_email: user.user_email,
      user_id: Number(this.idUser),
      user_password: user.user_password,
      user_type: user.user_type,
    };
    return admin;
  }

  async getDataForm(){
    this.submitted = true;
    if (this.registerForm.valid || this.edit) {
      if(this.rol==="profesor"){ 
        if(this.edit){ //EDITAR PROFESOR
            try {
              const user = this.createUser('TEACHER');
              const teacher = this.createTeacher(user);              
              let teacherResponse = await this.teachersService.update(teacher, this.id)
              if(teacherResponse.length===2){
                this.setModal(true);
              }
            } 
            catch (error) {
              console.log(error)
              this.setModal(false);
            }

        }
        else{ //CREAR PROFESOR
          try{
            if(this.materiaSelect==="new"){
              this.postSubject(this.registerForm.value.new_materia.toUpperCase());
            }
            const user = this.createUser('TEACHER')
            let userResponse = await this.usersService.createUser(user);
            this.idUser = userResponse.user_id;
            this.id = userResponse.teach_id;
            const teacher = this.createTeacher(user);
            await this.teachersService.update(teacher, this.id);
            this.setModal(true);
          }
          catch(error){
            this.setModal(false);
            console.log(error)
          }
        }
      }
      else if(this.rol==="alumno"){ 
        if(this.edit){ //EDITAR ALUMNO
          const user = this.createUser('STUDENT');
          const student = this.createStudent(user);
           await this.studentsService.update(student);
          this.setModal(true);
        }
        else{ //CREAR ALUMNO
          try{
            const user = this.createUser('STUDENT');
            let userResponse = await this.usersService.createUser(user);
            if(userResponse[0].student_id){
              this.idUser = userResponse[0].user_id;
              this.id = userResponse[0].student_id;
              const student = this.createStudent(user);
              let studentResponse = await this.studentsService.update(student);
              if(studentResponse.length===2){
                this.setModal(true);
              }
            }
          }
          catch(error){
            console.log(error)
            this.setModal(false);
          }
        }
      }
      else{ //EDITAR ADMIN
        try{
          const user = this.createUser('ADMIN');
          const admin = this.createAdmin(user);
          let adminResponse = await this.adminsService.update(admin);
          if(adminResponse.length===2){
            this.setModal(true);
          }
        }
        catch(error){
          console.log(error)
          this.setModal(false);
        }
      }
    } 
    else { 
      this.setModal(false)
    }
  }
  
  //modifica registerForm con los FormControl dependiendo si es profesor o alumno
  onRolChange(pRol:String): void{
    this.rol = pRol;
    if(this.rol === "profesor"){
      this.getSubjects();
      this.registerForm.addControl('price', new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]));
      this.registerForm.addControl('experiencia', new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(2)]));
      this.registerForm.addControl('descripcion', new FormControl('', Validators.required));
    }
    else{
      this.registerForm.removeControl('price');
      this.registerForm.removeControl('experiencia');
      this.registerForm.removeControl('descripcion');      
    }
  }

  onMateriaSelected(value:string): void {
		this.materiaSelect = value;
    if(this.materiaSelect==="new"){
      this.registerForm.addControl('new_materia', new FormControl('', Validators.required));
    }
    else{
      this.registerForm.removeControl('new_materia');
    }
	}

  onImageChange($event: any): void{
    this.imageReq = $event.target.files;
    console.log(this.imageReq);
  }

  passwordValidator(pForm: AbstractControl):any{
    const password: string = pForm.get('password')?.value;
    const password2: string = pForm.get('password2')?.value;
    if (password !== password2 && password2 !== "") {
      return { 'passwordvalidator': true }
    } 
    else return null
  }

  condicionesValidator(pForm: AbstractControl):any{
    if(!pForm.value){
      return {'condicionesvalidator' : 'Para poder registrate debes aceptar las condiciones y la política de privacidad'}
    }
    else return null
  }

  checkControl(pControlName: string, pError: string): boolean {
    const value = this.registerForm.get(pControlName);
    if (value?.hasError(pError) && value?.touched || this.submitted && value?.hasError(pError)) {
      return true;
    } 
    else return false;
  }

  setModal(ok: boolean):void{
    let modal = new bootstrap.Modal(document.getElementById('popUp'), {
      keyboard: false
    })
    if(ok){ //OK
      if(this.edit){ //EDITAR
        this.getModalTitle = "Tu perfil está actualizado";
        this.getModalBody = "Tus cambios se han guardado correctamente.";
        this.getModalRoute = `/area/${this.rol}/${this.id}`;
        this.getModalButton = "Volver a mi perfil";
      }
      else{ //CREAR
        this.getModalTitle = "Te has registrado correctamente";
        this.getModalBody = "Te has registrado en AppTeacher, ya puedes disfrutar con nosotros."
        this.getModalRoute = "/login";
        this.getModalButton = "Entrar"
      }
      this.getModalImg = "assets/images/PopUp/PopUpOK.png"
    }
    else{ //ERROR
      this.getModalTitle = "Ups! <br> Algo ha ido mal...";
      this.getModalBody = "¡Lo sentimos! <br> Vuelve a intentarlo más tarde.";
      this.getModalImg = "assets/images/PopUp/PopUpError.png"

      // if(this.imageReq==='empty' && this.rol==='profesor'){
      //   this.getModalBody = "El formulario no está rellenado correctamente, por favor, <b>añade una imagen</b>.";
      // }
      if(this.registerForm.invalid && !this.edit){
        this.getModalBody = "El formulario no está rellenado correctamente, por favor, <b>revisa todos los campos</b>.";
      }
    }
    modal.show();
  }
}
