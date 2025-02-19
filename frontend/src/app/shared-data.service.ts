import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private isTaskEditFormVisibleSource = new BehaviorSubject<boolean>(false)
  isTaskEditFormVisible$ = this.isTaskEditFormVisibleSource.asObservable()
  setUpdateForm(status : boolean){
    this.isTaskEditFormVisibleSource.next(status)
  }

  private viewTasksVisibleSource = new BehaviorSubject<boolean>(false)
  viewTasksVisible$ = this.viewTasksVisibleSource.asObservable()
  setViewForm(status : boolean){
    this.viewTasksVisibleSource.next(status)
  }

  private createFormVisibleSource = new BehaviorSubject<boolean>(false)
  createFormVisible$ = this.createFormVisibleSource.asObservable()
  setCreateForm(status : boolean){
    this.createFormVisibleSource.next(status)
  }

  private taskToUpdateSource = new BehaviorSubject<any>(null)
  taskToUpdate$ = this.taskToUpdateSource.asObservable()
  setUpdatedTask(task:any){
    this.taskToUpdateSource.next(task)
  }
  private visibleSorce = new BehaviorSubject<boolean>(false)
  visible$ = this.visibleSorce.asObservable()
  setVisibilityofSidebar(status:boolean){
    this.visibleSorce.next(status)
  }
  private visibleHeadingSource = new BehaviorSubject<boolean>(true)
  visibleHeading$ = this.visibleHeadingSource.asObservable()
  setVisibilityofHeading(status:boolean){
    this.visibleHeadingSource.next(status)
  }
  constructor() { }

}
