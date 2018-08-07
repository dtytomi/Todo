import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/catch';

import { Todo } from './todo';


// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class TodoService {

  headers: Headers;
  options: RequestOptions;


  private todoListUrl = 'api/Todo';

  constructor(private _http: Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json',
          'Accept': 'q=0.8;application/json;q=0.9' });
    this.options = new RequestOptions({ headers: this.headers });
   }

  getTodoList(): Observable<any> {
    return this._http.get(this.todoListUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  postTodoList(newTodo: Object): Observable<Todo> {

    return this._http.post(this.todoListUrl, newTodo, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
      const body = res.json();
      return body || {};
  }

  private handleError(error: any) {
      const errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
      return Observable.throw(errMsg);
  }

}
