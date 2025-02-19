import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PrimeNG } from 'primeng/config';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelect, MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, NgForm } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { NgClass } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DrawerModule } from 'primeng/drawer';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ButtonModule, SelectButtonModule, CommonModule,RadioButtonModule,ListboxModule, FloatLabelModule, DatePickerModule, CheckboxModule, AvatarModule,CardModule, TableModule, AvatarGroupModule, MenuModule, ToastModule, InputTextModule, MultiSelectModule, FormsModule, SelectModule, TagModule, IconFieldModule, InputIconModule, DrawerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone:true
})
export class LoginComponent {
   user = {
    email:'',
    password:''
   };
   errorMessage:string='';
   constructor(private apiService:ApiService, private router:Router){}

   login(loginForm:NgForm){
    if(loginForm.invalid){
      return;
    }
    this.apiService.loginUserApi(this.user).subscribe({
      next:(response)=>{
        console.log('Log in successfull:',response);
        alert('Login successfull');
        localStorage.setItem('user', JSON.stringify(this.user));  // Store user data in localStorage
        localStorage.setItem('jwtToken',response.token);
        this.router.navigate(['/dashboard']);
      },
      error:(error)=>{
        console.log('Login error:',error);
        if(error.status===404){
          this.errorMessage = 'Invalid email or password . Try again'
        }
        else if (error.status === 500) {
          // Server error
          this.errorMessage = 'An error occurred on the server. Please try again later.';
        } else {
          // Handle other errors
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
        alert('Login failed');
      },
    });
   }
}
