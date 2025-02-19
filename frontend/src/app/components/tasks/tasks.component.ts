import { Component, OnInit, Input, Output } from '@angular/core';
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
import { EditComponent } from '../edit/edit.component';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../../shared-data.service';
import { Router } from '@angular/router';
import { DeleteComponent } from "../delete/delete.component";
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { EventEmitter } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
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
  selector: 'app-tasks',
  imports: [ButtonModule, SelectButtonModule, DropdownModule, DialogModule, CommonModule, RadioButtonModule, EditComponent, ListboxModule, FloatLabelModule, DatePickerModule, CheckboxModule, AvatarModule, CardModule, TableModule, AvatarGroupModule, MenuModule, ToastModule, InputTextModule, MultiSelectModule, FormsModule, SelectModule, TagModule, IconFieldModule, InputIconModule, DrawerModule, DeleteComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {


  @Input() task: any;
  @Output() taskDeleted = new EventEmitter<void>();
  @Output() cancelsoftdelete = new EventEmitter<void>();


  priorityOptions = [
    { label: 'filter by priority', value: null },
    { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' },
    { label: 'Low', value: 'low' }
  ];
  statusOptions = [
    { label: 'Filter by status', value: null },
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Completed', value: 'completed' }
  ];
  priorityFilter: string | null = null; // Holds the priority filter
  statusFilter: string | null = null;
  searchQuery: string | null = null;


  filterTable() {
    this.tasks = this.allTasks.filter(task => {
      const statusMatch = !this.statusFilter || task.status === this.statusFilter;
      const priorityMatch = !this.priorityFilter || task.priority === this.priorityFilter;
      const searchMatch = !this.searchQuery || task.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      return statusMatch && priorityMatch && searchMatch;
    });
  }
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
  tasks: Task[] = [];
  allTasks : Task[]=[];
  customers = [
    {
      name: "customers",
      country: "US",
      representative: "TEST",
      status: true
    }
  ];
  representatives = [{ label: "edvak", name: "edvak" }];
  deleteTasks: Task[] = [];


  value = "";
  ingredient: any = '';
  visible = false;
  selectedTask: any = null;
  isEditMode = false;
  isDeleteDialogVisible = false;
  idTodeleteTheTask: string = "";

  constructor(private primeng: PrimeNG, private apiService: ApiService, private router: Router, private SharedDataService: SharedDataService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.primeng.ripple.set(true);
    // this.deleteTasks = JSON.parse(localStorage.getItem('deletedTasks') || '[]');
    this.getTasks();
  }

  getTasks() {
    this.apiService.getTaskApi().subscribe(
      (data: any[]) => {  // Accept any type here initially for data
        this.allTasks = data.map((task) => ({
          ...task,
          id: task._id,  // Map _id to id
          //_id: undefined, // Optionally remove _id if not needed
        }));
        this.deleteTasks = JSON.parse(localStorage.getItem('deletedTasks') || '[]');

        // Filter out tasks whose id is found in the deletedTasks array
        this.allTasks = this.allTasks.filter((task) =>
          !this.deleteTasks.some((dt) => dt.id === task.id)
        );
        this.tasks=[...this.allTasks]
      }
    );
  }


  editTask(task: Task) {
    this.selectedTask = { ...task };
    // this.visible=true;
    console.log(`task to edit : ${JSON.stringify(task)}`)
    this.SharedDataService.setUpdatedTask(task)
    this.SharedDataService.setUpdateForm(true)
    this.SharedDataService.setViewForm(false)
    this.SharedDataService.setCreateForm(false)

  }

  handleTaskUpdated() {
    // this.visible = false;
    this.selectedTask = null;
    this.getTasks();
  }
  cancelEdit() {
    // this.selectedTask = null;
    this.router.navigate(['/dashboard'])
    this.SharedDataService.setUpdateForm(false);

  }

  deleteTask(taskId: string) {
    console.log(`task id to delete : ${taskId}`)
    this.isDeleteDialogVisible = true;
    this.idTodeleteTheTask = taskId
  }
  handleTaskDeleted() {
    this.isDeleteDialogVisible = false;
    this.getTasks();
  }
  cancelDelete() {
    console.log("task delete cancel")
  }
  confirmDelete() {
    console.log(`task id in confirm delete method : ${this.idTodeleteTheTask}`)
    console.log(`tasks in confirm delete method : ${this.tasks}`)
    // Find the index of the task to delete
    const taskIndex = this.tasks.findIndex(task => task.id === this.idTodeleteTheTask);

    // Check if task was found
    if (taskIndex === -1) {
      console.error('Task not found');
      return; // Exit if task is not found
    }

    // Remove the task from the array using splice and store the deleted task
    const deletedTask = this.tasks.splice(taskIndex, 1)[0]; // This removes the task from the array and gives you the deleted task

    // Add the deleted task to the deleteTasks array
    this.deleteTasks.push(deletedTask);
    console.log(`task to delete on confirm: ${JSON.stringify(this.deleteTasks)}`);

    // Update localStorage with the new deleted tasks
    localStorage.setItem("deletedTasks", JSON.stringify(this.deleteTasks));

    // Close the delete dialog and refresh the task list
    this.isDeleteDialogVisible = false;
    this.getTasks();
  }


  cancel() {
    this.isDeleteDialogVisible = false;
    this.cancelsoftdelete.emit();
  }
  toggleDarkMode() {
    const element = document.querySelector('html');
    element && element.classList.toggle('dark-theme');

  }
}
