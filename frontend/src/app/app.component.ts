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
import { LoginComponent } from "./components/login/login.component";
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-root',
  imports: [RouterModule,ButtonModule, RouterOutlet,SelectButtonModule, RadioButtonModule, ListboxModule, FloatLabelModule, DatePickerModule, CheckboxModule, AvatarModule, CardModule, TableModule, AvatarGroupModule, MenuModule, ToastModule, InputTextModule, MultiSelectModule, FormsModule, SelectModule, TagModule, IconFieldModule, InputIconModule, DrawerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers : [MessageService]
})

export class AppComponent implements OnInit {
  title = 'ehr-demo';
 
  constructor(private primeng: PrimeNG) { }

  ngOnInit(): void {
    this.primeng.ripple.set(true);
  }

  
}
