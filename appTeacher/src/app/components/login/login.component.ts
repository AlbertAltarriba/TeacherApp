import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
const bootstrap = require('bootstrap');


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  userType: string = '';
  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}


  ngOnInit(): void {}

  async getLogin(pForm: any): Promise<void> {

    try{
    let response = await this.usersService.login(pForm.value);
    console.log(response)

    localStorage.setItem('user-token', response.token);
    localStorage.setItem('id', response.id_usuario);

    let type = response.tipo_user.toLowerCase();
    if(type==='student') {
      localStorage.setItem('userType', 'alumno')
      this.userType = 'alumno'
    }
    else if(type==='teacher'){
      localStorage.setItem('userType', 'profesor')
      this.userType = 'profesor'
    }
    else{
      localStorage.setItem('userType', 'admin')
      this.userType = 'admin'
    }

    
    this.router.navigate(['/area/' + this.userType + '/' + response.id_usuario]);
    } 
    catch(error) {
      console.log(error)
      let modal = new bootstrap.Modal(document.getElementById('popUp'), {keyboard: false})
      modal.show();
    }
  }

  //TODO :esto se quita!!
  superpower(){
    localStorage.setItem('user-token', 'superpower');
    this.router.navigate(['/map']);
  }

}