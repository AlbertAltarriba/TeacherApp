import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  token: boolean = false;
  userType: string | null = '';
  id: string | null = '';
  isCollapsed: boolean = false;
  constructor() {}

  ngOnInit(): void {
    const tokenValue = localStorage.getItem('user-token');
    if (tokenValue){
     this.token = true;
     this.userType = localStorage.getItem('userType');
     this.id = localStorage.getItem('id');
    }
  }

  logOut(): void {
    localStorage.removeItem('user-token');
    window.location.reload();
  }

  toggle(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
