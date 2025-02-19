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
import{ DialogModule} from 'primeng/dialog';
@Component({
  selector: 'app-delete',
  imports: [ButtonModule,CommonModule, SelectButtonModule,RadioButtonModule, ListboxModule, FloatLabelModule, DatePickerModule, CheckboxModule, AvatarModule, CardModule, TableModule, AvatarGroupModule,
    MenuModule, ToastModule, InputTextModule, MultiSelectModule, FormsModule, SelectModule, TagModule, IconFieldModule, InputIconModule, DrawerModule,DialogModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss',
  providers:[MessageService],
})
export class DeleteComponent {
  @Input() task: any;
  @Output() taskDeleted = new EventEmitter<void>();
  @Output() cancelDelete = new EventEmitter<void>();

  constructor(private apiService:ApiService, private messageService:MessageService){}
  isDeleteDialogVisible = false;




  confirmDelete(){
    if(!this.task || !this.task._id) return;
    this.apiService.softDeleteTaskApi(this.task._id).subscribe({
      next:()=>{
        this.messageService.add({severity:'success', summary:'Deleted' , detail:'Task delted successfully' });
        this.taskDeleted.emit();
      },
      error:()=>{
        this.messageService.add({severity:'error' , summary:'Error', detail:'Error in deleting the task' });
      },
    });
  }

  cancel(){
    this.isDeleteDialogVisible = false;
    this.cancelDelete.emit();
  }
}
