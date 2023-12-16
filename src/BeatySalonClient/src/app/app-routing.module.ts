import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { AddEditComponent } from './modules/add-edit/add-edit.component';
import { AdminPageComponent } from './modules/admin-page/admin-page.component';
import { LoginComponent } from './modules/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminPageComponent, canActivate: [authGuard]},
  { path: 'add-edit/:id', component: AddEditComponent,canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
