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
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { TasksComponent } from '../tasks/tasks.component';
import { EditComponent } from '../edit/edit.component';
import { SharedDataService } from '../../shared-data.service';
import { DeleteComponent } from "../delete/delete.component";
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  imports: [EditComponent, ButtonModule, TasksComponent, CreateTaskComponent, CommonModule, SelectButtonModule, RadioButtonModule, ListboxModule, FloatLabelModule, DatePickerModule, CheckboxModule, AvatarModule, CardModule, TableModule,
    AvatarGroupModule, MenuModule, ToastModule, InputTextModule, MultiSelectModule, FormsModule, SelectModule, TagModule, IconFieldModule, InputIconModule, DrawerModule, DeleteComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  title = 'ehr-demo';
  userEmail: string = '';
  userInitial: string = '';
  items:any[]=[];
  
  visible = false
  createFormVisible = false;
  viewTasksVisible = false;
  editTasksVisible = false;
  isTaskEditFormVisible = false;

  selectedTask = null;
  constructor(private primeng: PrimeNG, private SharedDataService: SharedDataService, private router: Router) { }




  ngOnInit(): void {



    this.SharedDataService.isTaskEditFormVisible$.subscribe((vs) => {
      this.isTaskEditFormVisible = vs;
    });

    // Subscribe to taskUpdated event (if you're emitting it from the EditComponent)
    this.SharedDataService. taskToUpdate$ .subscribe(() => {
      this.isTaskEditFormVisible = false;  // Close the edit form
      this.toggleViewTasks();  // Switch back to the view tasks form
    });

 


    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.email) {
      this.userEmail = user.email;
      this.userInitial = this.userEmail.charAt(0).toUpperCase();  // Take first letter for avatar

      this.items = [
        {
          items: [
            {
              label: this.userEmail,  // Display the user's email directly
              disabled: true,
            },
            {
              label: 'Log out',
              icon: 'pi pi-arrow-right',
              command: () => this.logout(),
            }
          ]
        }
      ];
    }


    this.primeng.ripple.set(true);
    this.SharedDataService.isTaskEditFormVisible$.subscribe((vs) => {
      this.isTaskEditFormVisible = vs;
    })
    this.SharedDataService.viewTasksVisible$.subscribe((vs) => {
      this.viewTasksVisible = vs
    })
    this.SharedDataService.createFormVisible$.subscribe((vs) => {
      this.createFormVisible = vs
    })
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    element && element.classList.toggle('dark-theme');
  }
  toggleCreateForm() {
    this.SharedDataService.setCreateForm(true)
    this.SharedDataService.setUpdateForm(false)
    this.SharedDataService.setViewForm(false)
    // this.createFormVisible=true;
    // this.viewTasksVisible=false;
    // this.editTasksVisible=false;
  }
  closeCreateForm() {
    this.createFormVisible = false;
  }
  toggleViewTasks() {
    this.viewTasksVisible = true;
    this.createFormVisible = false;
    this.editTasksVisible = false;
  }
  
  toggledEditForm(task: any) {
    this.selectedTask = task;
    this.viewTasksVisible = false;
    this.createFormVisible = false;
    this.editTasksVisible = true;
  }
  toggleDeleteTasks() {
    this.viewTasksVisible = true;
    this.createFormVisible = false;
    this.editTasksVisible = false;
  }
  closeEditForm() {
    this.editTasksVisible = false;
    this.selectedTask = null;
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
