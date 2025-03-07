import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http: HttpClient) { }


  //helper function to get hte auth header with token

  private getAuthHeaders():HttpHeaders{
    const token = localStorage.getItem('jwtToken');
    let headers = new HttpHeaders();
    if(token){
      headers = headers.set('Authorization',`Bearer ${token}`);
    }
    return headers;
  }


  addUserApi(user : any)  :  Observable<any>{
    console.log(user);
    return this.http.post("http://localhost:3000/add" , user)
  }
  loginUserApi(user : any)  :  Observable<any>{
    console.log(user);
    return this.http.post("http://localhost:3000/login" , user)
  }
//   getUserApi(userId:string):Observable<any>{
//     console.log(userId);
//     return this.http.get(`http://localhost:3000/user/${userId}`)
//   }
//    // Method to add a new task
   addTaskApi(Task: any): Observable<any> {
    console.log('Sending task to backend:', Task);
    return this.http.post("http://localhost:3000/task",Task,{
      headers : this.getAuthHeaders()
    });
  }
  getTaskApi(): Observable<any> {
    return this.http.get<any>("http://localhost:3000/task",{
      headers : this.getAuthHeaders()
    });
  }
  updateTaskApi(task: any):Observable<any>{
    if(!task._id){
      console.error('task id is missing');
      return new Observable(observer => observer.error("Task ID is required"));
    }
    console.log('updating the task with ID:',task._id);
    return this.http.put(`http://localhost:3000/task/${task._id}`,task,{
      headers: this.getAuthHeaders()
    });
  }
  softDeleteTaskApi(taskId:string):Observable<any>{
    return this.http.put(`http://localhost:3000/task/${taskId}`,{isDeleted:true},{
      headers:this.getAuthHeaders()
    });
  }
  getUserSignupDetailsApi():Observable<any>{
    console.log('getting registered users');
    return this.http.get(`http://localhost:3000/users`,{
      headers:this.getAuthHeaders()
    });
  }
 }
