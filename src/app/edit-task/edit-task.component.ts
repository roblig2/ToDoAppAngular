import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../model/Task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  formGroup!:FormGroup;
  errorMessage!:string;
  name!:string;
  taskId!:number;
  finished!:boolean;
  constructor(private taskService:TaskService,
    private route:ActivatedRoute,
    private router:Router,
    private formBuilder:FormBuilder) {
    }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name:['',Validators.required]
    })
    this.taskId = Number (this.route.snapshot.url[1].path);
    this.taskService.getTask(this.taskId).subscribe(
      response=>{
        this.name = response.name;
        this.finished = response.finished;
        
      }
    );
  }

  saveTask(){
    this.taskService.updateTask({id:this.taskId,name:this.formGroup.value.name,finished:this.finished}).subscribe(
      response=>{
        this.router.navigate(["/"]);
      },
      err=>this.errorMessage="Pole nie moze być puste"
    )
  }

}
