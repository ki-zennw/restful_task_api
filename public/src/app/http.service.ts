import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
  }
  
  getTasks() {
    return this._http.get('/tasks');
  }

  postToServer(num) {
    console.log("num is:", num);
    return this._http.post('/new', num);
  }

  showTask(task) {
    console.log("SHOW TASK:", task);
    return this._http.get('/' + task._id);
  }

  post(taskObj) {
    return this._http.post('/new', taskObj);
  }
  deleteTask(id) {
    console.log("DELETE TASK:", id);
    return this._http.delete('/delete/' + id);
  }

  updateTask(task) {
    console.log("UPDATE TASK ID:", task);
    console.log(task._id)
    return this._http.put('/update/' + task._id, task);
  }
}

