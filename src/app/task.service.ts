import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddTask } from './model/AddTask';
import { Task } from './model/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService{

  constructor(private http:HttpClient) { }

  getAllTasks():Observable<any>{
    return this.http.get("/api/task");
  }

  deleteTask(id:number){
    return this.http.delete(`api/task/${id}`);
  }

  addTask(task:AddTask):Observable<any>{
    return this.http.post(`api/task`,task);
  }
  completeTask(task:Task):Observable<any>{
    task.finished = true;
    return this.http.put(`api/task/status/${task.id}`,task);
  }
  getTask(id:number):Observable<any>{
    return this.http.get('api/task/'+id);
  }
  updateTask(task:Task):Observable<any>{
    return this.http.put(`api/task/${task.id}`,task);
  }
  getFinishedTasks():Observable<any>{
    return this.http.get('api/tasks/true');
  }
}
