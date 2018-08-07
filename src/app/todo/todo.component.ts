import { Component, OnInit } from '@angular/core';

import { TodoService } from '../todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoLists: Todo[];
  newTodo = new Todo();

  constructor( private _todoService: TodoService) { }

  ngOnInit(): void {
    this._todoService.getTodoList()
      .subscribe(
        result => {
          this.todoLists = result.json();
        }
      );
  }

  createTodo(newTodo: object) {
    this._todoService.postTodoList(this.newTodo)
      .subscribe(
        result => {
          this.todoLists.push(result);
          this.reset();
        }
      );
  }

  private reset() {
    this.newTodo.name = null;
    this.newTodo.isComplete = false;
  }

}
