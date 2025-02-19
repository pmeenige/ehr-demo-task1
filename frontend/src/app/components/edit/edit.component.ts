import { Component, OnInit, Output, Input } from '@angular/core';
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
import { InputTextarea } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../api.service';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../../shared-data.service';
import { CommonModule } from '@angular/common';
// Define the Task interface here
export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  priority: string;
  dueDate: string;
  status: string;
  isRead: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-edit',
  imports: [ButtonModule, CommonModule, SelectButtonModule, InputTextarea, RadioButtonModule, ListboxModule, FloatLabelModule, DatePickerModule, CheckboxModule, AvatarModule, CardModule, TableModule, AvatarGroupModule,
    MenuModule, ToastModule, InputTextModule, MultiSelectModule, FormsModule, SelectModule, TagModule, IconFieldModule, InputIconModule, DrawerModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  @Input() task: any = null;
  @Output() taskUpdated = new EventEmitter<void>();
  @Output() cancelEdit = new EventEmitter<void>();


  constructor(private apiService: ApiService, private messageService: MessageService, private router: Router, private SharedDataService: SharedDataService) { }


  updateTask() {
    if (!this.task || !this.task._id) return;
    this.apiService.updateTaskApi(this.task).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task updated successfully' });
        this.taskUpdated.emit();
        // this.router.navigate(['/dashboard']);
        this.SharedDataService.setUpdateForm(false)
        this.SharedDataService.setViewForm(true)
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update task' });
      }
    });
  }


  // task: Task = {
  //   id: '',
  //   title: '',
  //   description: '',
  //   assignedTo: '',
  //   priority: '',
  //   dueDate: '',
  //   status: '',
  //   isRead: false,
  //   isDeleted: false,
  //   createdAt: '',
  //   updatedAt: ''
  // };

  users = [
    "user1", "user2", "user3"
  ];
  priorities = [
    "low", "medium", "high"
  ];




  ngOnInit() {
    // if (this.taskUpdated ) {
    //   this.task = { ...this.taskUpdated  };
    // }
    this.SharedDataService.taskToUpdate$.subscribe((task) => {
      this.task = task;
    })

  }
  cancel() {
    this.SharedDataService.setUpdateForm(false)
    this.SharedDataService.setViewForm(true)
    this.cancelEdit.emit();
    this.task = {
      id: '',
      title: '',
      description: '',
      assignedTo: '',
      dueDate: '',
      priority: '',
      status: '',
      isRead: false, // Make sure this is a boolean, not a string
      isDeleted: false, // Same for isDeleted
      createdAt: '',
      updatedAt: ''
    };

  }

}
