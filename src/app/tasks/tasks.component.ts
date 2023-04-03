import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService} from '../task.service';
import {Task} from '../model/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasksList!:Task[];
  noTasksFound = "Brak zadań, dodaj własne";
  constructor(private taskService:TaskService,
    private router:Router) { 
      this.tasksList=[];
    }

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe({
      next: response=>{
        console.log(response);
        this.tasksList=response;
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  completeTask(task:Task){
    console.log("completed Task");
    this.taskService.completeTask(task).subscribe(
      response=>{
        let index = this.tasksList.indexOf(task);
        this.tasksList[index].finished = response.finished;
      }
    );

  }
  editTask(task:Task){
    this.router.navigate(['/edit-task/',task.id]);
  }

  deleteTask(taskId:number){
    console.log("delete method");
    this.taskService.deleteTask(taskId)
    .subscribe(response => {
      this.tasksList = this.tasksList.filter(item => item.id !== taskId);
    });
  }

}
