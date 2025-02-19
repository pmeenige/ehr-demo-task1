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
@Component({
  selector: 'app-about',
  imports: [ButtonModule, SelectButtonModule, RadioButtonModule, ListboxModule, FloatLabelModule, DatePickerModule, CheckboxModule, AvatarModule,CardModule, TableModule, AvatarGroupModule, MenuModule, ToastModule, InputTextModule, MultiSelectModule, FormsModule, SelectModule, TagModule,IconFieldModule, InputIconModule, DrawerModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
    title = 'ehr-demo';
      items = [
        {
          label: 'Options',
          items: [
            {
              label: 'Refresh',
              icon: 'pi pi-refresh'
            },
            {
              label: 'Export',
              icon: 'pi pi-upload'
            }
          ]
        }
      ];
      
      customers = [
        {
          name: "customers",
          country: "US",
          representative: "TEST",
          status: true
        }
      ];
      representatives = [{ label: "edvak", name: "edvak" }];
      value = "";
      ingredient: any = '';
      visible = false
      constructor(private primeng: PrimeNG) { }
    
      ngOnInit(): void {
        this.primeng.ripple.set(true);
      }
    
      toggleDarkMode() {
        const element = document.querySelector('html');
        element && element.classList.toggle('dark-theme');
      }
}
