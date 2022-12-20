import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminStudentsComponent } from './components/admin-students/admin-students.component';

import { ErrorPageComponent } from './components/error-page/error-page.component';
import { FormComponent } from './components/form/form.component';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { PrivateAreaComponent } from './components/private-area/private-area.component';
import { ValorationComponent } from './components/valoration/valoration.component';
import { ProfileGuard } from './guards/profile.guard';
import { TokenGuard } from './guards/token.guard';
import { TypeGuard } from './guards/type.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'map' },
  // { path: 'home', component: HomeComponent },
  { path: 'map', component: MapComponent },
  { path: 'login', component: LoginComponent },
  { path: 'form', component: FormComponent },
  { path: 'area/:userType/:userId', component: PrivateAreaComponent, canActivate: [TokenGuard, TypeGuard] },
  { path: 'area/:userType/:userId/valoration', component: ValorationComponent, canActivate: [TokenGuard, TypeGuard] },
  { path: 'area/:userType/:userId/myProfile', component: FormComponent, canActivate: [TokenGuard, ProfileGuard, TypeGuard] },
  { path: 'area/:userType/:userId/students',component: AdminStudentsComponent, canActivate: [TokenGuard, TypeGuard] },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
