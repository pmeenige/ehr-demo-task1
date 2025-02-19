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
import { FormsModule } from '@angular/forms';
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
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgForm , Validators} from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  imports: [ButtonModule, SelectButtonModule,CommonModule, RadioButtonModule,ListboxModule, FloatLabelModule, DatePickerModule, CheckboxModule, AvatarModule,CardModule, TableModule, AvatarGroupModule, MenuModule, ToastModule, InputTextModule, MultiSelectModule, FormsModule, SelectModule, TagModule, IconFieldModule, InputIconModule, DrawerModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  standalone:true,
})
export class SignUpComponent {
  user={
    first_name:'',
    last_name:'',
    email:'',
    password:''
  };

  constructor(private apiService:ApiService, private router:Router){}

  signUp(signUpform : NgForm){
    if(signUpform.invalid){
      console.log('invalid data')
      alert('Please fill out the form correctly');
      return;
    }
    this.apiService.addUserApi(this.user).subscribe({
      next:(response)=>{
        console.log('user registered successfully:',response);
        alert('Registration successfull');
        this.router.navigate(['/login']);
      },
      error: (error)=>{
        console.log('Error registratin user:',error);
        if(error.status === 400 && error.error.message === "Email already exists."){
          alert('This email is already registered.');
        }else{
        alert('Registartion failed');
        }
      },
    });
  }
}

