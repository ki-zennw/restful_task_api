import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'public';
  tasks = [];
  third_task = [];
  shown_task = [];
  newTask: any;
  updatedTask: any;
  selectedTask = false;
  task = {};


  constructor(private _httpService: HttpService) { }
  ngOnInit() {
    this.newTask = { title: "", description: "" }
  }

  getTasksFromService() {
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      // console.log("GOT OUR DATA", data);
      this.tasks = data['tasks'];
      this.third_task = this.tasks[2];
    })
  }

  onButtonClickGetTasks(): void {
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      this.tasks = data['tasks'],
        this.getTasksFromService()
    })
  }

  taskToShow(task): void {
    this._httpService.showTask(task).subscribe(data => {
      console.log(data);
      this.selectedTask = true;
      this.task = data['task'];
    })
  }

  // showTaskFromService(id): void {
  //   let observable = this._httpService.showTask(id);
  //   observable.subscribe(data => {
  //     console.log("DATA:", data);
  //   })
  // }

  onButtonClickGetUpdate(id, task): void {
    console.log(task);
    id = id.target.id;
    // let observable = this._httpService.showTask(id);
    // observable.subscribe(data => {
    // console.log("ON CLICK DATA:", data);
    this.shown_task = task;
    // console.log("SHOWN TASK:", this.shown_task);
    // this.showTaskFromService(data)
    // })
  }

  onSubmitCreate() {
    this._httpService.post(this.newTask).subscribe((responseData) => {
      console.log(responseData);
      this.newTask = { title: "", description: "" }
      this.getTasksFromService();
    })
  }

  onButtonClickDelete(id): void {
    id = id.target.id;
    this._httpService.deleteTask(id).subscribe((resData) => {
      console.log("DATA TO DELETE:", resData);
      // this.deleteTaskFromService(resData);
      this.getTasksFromService();
    })
  }


  onSubmitUpdate(id): void {
    console.log(event);
    id = id.target.id;
    console.log("ID TO UPDATE:", id);
    this._httpService.updateTask(this.shown_task).subscribe((resData) => {
      console.log("RESDATA TO UPDATE:", resData);
      this.getTasksFromService();
    })
  }
  // onButtonClick(): void {
  //   console.log(`Click event is working`);
  // }
  // onButtonClickParam(num: Number): void {
  //   console.log(`Click event is working with num param: ${num}`);
  //   let observable = this._httpService.postToServer({ data: num });
  //   observable.subscribe(data => console.log("got our data w/ click!", data));
  // }
  // onButtonClickParams(num: Number, str: String): void {
  //   console.log(`Click event is working with num param: ${num} and str param: ${str}`);
  // }
  // onButtonClickEvent(event: any): void {
  //   console.log(`Click event is working with event: ${event}`, event)
  // }

}
