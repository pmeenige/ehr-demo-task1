import { Component, OnInit, Output } from '@angular/core';
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
@Component({
  selector: 'app-create-task',
  imports: [ButtonModule, SelectButtonModule,  RadioButtonModule,ListboxModule, FloatLabelModule, DatePickerModule, CheckboxModule, AvatarModule,CardModule, TableModule, 
    AvatarGroupModule, MenuModule, ToastModule, InputTextModule,InputTextarea, MultiSelectModule, FormsModule, SelectModule, TagModule, IconFieldModule, InputIconModule, DrawerModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
  providers:[MessageService]
})
export class CreateTaskComponent {
 
  @Output() taskCreated = new EventEmitter<void>();
  @Output()cancelCreate = new EventEmitter<void>();
  Task=
    {
      title:'',
      description:'',
      assignedTo:'',
      dueDate:'',
      priority:'',
      status:'',
      isRead:'false'
    };
    users : string[] = []
  priorities = [
   "low","medium","high"
  ];
  ngOnInit():void{
    this.apiService.getUserSignupDetailsApi().subscribe(
      (response)=>{
        console.log('users:',response.users)
        const users : any []=response.users
        const user_first_names= users.map(user=>
          user.first_name
        )
       console.log(user_first_names)
       this.users=user_first_names
      },(error)=>{
        console.log('Error occured while reading the users');
      });
  }
  constructor(private apiService:ApiService, private messageService:MessageService,private router:Router, private sharedDataService:SharedDataService){}

  createTask(){
    const formattedTask = {
      title: this.Task.title,
      description: this.Task.description,
      assignedTo: this.Task.assignedTo,// Fix: Extract string value
      dueDate: this.Task.dueDate ? new Date(this.Task.dueDate).toISOString() : "",  // Fix: Convert Date object to ISO format
      priority: this.Task.priority, // Fix: Extract string value
      status: this.Task.status,
      isRead: Boolean(this.Task.isRead)  // Fix: Convert string to boolean
    };
  
    console.log('Creating Task:', formattedTask);  // Debugging log
    if(!formattedTask.title || !formattedTask.assignedTo || !formattedTask.dueDate || !formattedTask.priority || !formattedTask.status){
      alert("Please Fill the fields that are empty");
      return;
    }
    this.apiService.addTaskApi(formattedTask).subscribe({
      next:(response)=>{
        console.log('Task created:',response);
        this.messageService.add({severity:'success',summary:'Success',detail:'created task succesffuy'})
        this.taskCreated.emit();
        this.sharedDataService.setUpdateForm(false)
        this.sharedDataService.setCreateForm(false)
        this.sharedDataService.setViewForm(true)
        alert("Task created successfully")
      },
      error:(err)=>{
        console.error('Error creating task:',err);
        //alert(`this is from alert ${err.error}`);
        this.messageService.add({severity:'error',summary:'Error',detail:'failed to create task'});
      }
    });
  }
  cancel() {
    // Reset the form and close it (if needed)
    this.cancelCreate.emit();
    this.Task = {
      title: '',
      description: '',
      assignedTo: '',
      dueDate: '',
      priority: '',
      status: '',
      isRead: 'false'
    };
    this.router.navigate(['./dashboard'])
  }
}
