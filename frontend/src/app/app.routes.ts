import { Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { FilterComponent } from './components/filter/filter.component';
import { authGuard } from './auth.service';
export const routes: Routes = [
    {path:'', redirectTo:'/login', pathMatch:'full'},
    {path:'dashboard',component:DashboardComponent,canActivate : [authGuard]},
    {path:'login',component:LoginComponent},
    {path : 'create',component:CreateTaskComponent,canActivate : [authGuard]},
    {path:'signup',component:SignUpComponent},
    {path : 'filter',component:FilterComponent,canActivate : [authGuard]},
    {path :'tasks',component:TasksComponent,canActivate : [authGuard]},

];
