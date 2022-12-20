import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PrivateAreaComponent } from './components/private-area/private-area.component';

import { FormComponent } from './components/form/form.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ValorationComponent } from './components/valoration/valoration.component';
import { AsideComponent } from './components/aside/aside.component';
import { MapComponent } from './components/map/map.component';
import { MapasideComponent } from './components/mapaside/mapaside.component';
import { environment } from 'src/environments/environment';
import { AdminStudentsComponent } from './components/admin-students/admin-students.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    PrivateAreaComponent,
    FormComponent,
    ErrorPageComponent,
    ValorationComponent,
    AsideComponent,
    MapComponent,
    MapasideComponent,
    AdminStudentsComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule.forRoot(environment.googleMaps),
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
