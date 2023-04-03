import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { TasksComponent } from '../tasks/tasks.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  formGroup!:FormGroup;
  errorMessage!:string;
  constructor(private taskService:TaskService,
    private formBuilder:FormBuilder,
    private taskComponent:TasksComponent) { 
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name:['',Validators.required]
    })
  }
  submit(){
    console.log(this.formGroup.value);
    this.taskService.addTask(this.formGroup.value).subscribe(
        response=>{
          this.taskComponent.ngOnInit()
          this.errorMessage ="";
        },
        error=>{
          this.errorMessage = "Pole nie moze być puste";
      }
  );
  }

}
