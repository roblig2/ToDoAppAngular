import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path : '',
    component:AppComponent,
    children:[
      {
        path:'',
        component: HomeComponent
      }
    ]
  },
  {
    path : 'edit-task/:id',
    component:EditTaskComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
