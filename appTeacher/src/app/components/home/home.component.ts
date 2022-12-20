import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'src/app/interfaces/subject.interface';
import { DataService } from 'src/app/services/data.service';
import { SubjectsService } from 'src/app/services/subjects.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  zip: number = 0;
  subject: string = '';
  arrSubjects: Subject[] = [];

  constructor(
    private dataService: DataService,
    private subjectsService: SubjectsService
  ) {}

  ngOnInit(): void {
    this.getSubjects();
  }

  guardarDatos() {
    this.dataService.zip = this.zip;
    this.dataService.subject = this.subject;
  }
  async getSubjects() {
    this.arrSubjects = await this.subjectsService.getAll();

    return this.arrSubjects;
  }
}
