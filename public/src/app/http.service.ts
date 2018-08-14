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
  postToServer(num){
    console.log("num is:", num);
    return this._http.post('/new', num);
  }
  showTask(task) {
    console.log("TASK:", task);
    return this._http.get(task);
  }
}

