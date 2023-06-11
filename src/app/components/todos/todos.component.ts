import { Component } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodosService } from 'src/app/todos.service';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})

export class TodosComponent {

  // Methods with Firebase

  faCirclePlus = faCirclePlus
  faCircleCheck = faCircleCheck
  faCircle = faCircle
  faTrashCan = faTrashCan

  todos: any[] = [];

  constructor(private todosService:TodosService) {}

  ngOnInit(): void {
    this.todosService.firestoreCollection.valueChanges({idField: 'id'}).subscribe(item => {
      this.todos = item;
    })
  }

  submit(titleInput: HTMLInputElement) {
    if (titleInput.value) {
      this.todosService.addTodo(titleInput.value)
      titleInput.value = "";
    }
  }

  onStatusChange(id: string, newStatus: boolean) {
    this.todosService.updateTodoStatus(id, newStatus);
    console.log(id, newStatus)
  }

  onDelete(id: string) {
    this.todosService.deleteTodo(id);
  }


  // Methods without database

  todoss:Todo[] = [];
  newTodo:string;

  saveTodo() {
    if(this.newTodo) {
      let todo = new Todo();
      todo.name = this.newTodo;
      todo.isCompleted = true;
      this.todos.push(todo);
      this.newTodo = ''
      console.log(this.todos)
    } else {
      alert('Please Enter Todo')
    }
  }

  done(id:number) {
    this.todos[id].isCompleted = !this.todos[id].isCompleted;
  }

  remove(id:number) {
    this.todos = this.todos.filter((v, i) => i !== id);
  }
}
