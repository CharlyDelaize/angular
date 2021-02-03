import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/interface/todo';
import { TodoListService } from 'src/app/services/todo-list.service';
import{ BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateY(0px)' })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0, transform: 'translateY(30px)' }))
      ])
    ])
  ]
})

export class TodoListComponent implements OnInit {
  //ng g s servicesng g s services
  constructor(private service: TodoListService) { }

  listTodo : Todo[]; // La liste de tache à afficher à l'écran
  newTodo : string; // La nouvelle tache que l'on va créer
  idTodo : number;
  cacheBeforeEditTodo : string;
  filter: string;
  isChecked: boolean;

  ngOnInit(): void { //au démarage de la page

    /* this.listTodo = [
      {
        "1" : 1,
        "title" : "Ma super tache de la journée",
        "completed" : false,
        "editing" : false
      },
      {
        "1" : 1,
        "title" : "Autre tache importante",
        "completed" : false,
        "editing" : false
      },
      {
        "1" : 1,
        "title" : "Tache à faire mec",
        "completed" : false,
        "editing" : false
      },
    ]; */

    this.listTodo = this.service.getTodo();
    this.idTodo = 4;
    this.filter = 'All';

  }

  addTodo() : void{

    if(this.newTodo.trim().length === 0){ // si la taille de mon champ est égal à 0
      return; // Je ne fais rien
    }

    this.listTodo.push({
      id: this.idTodo,
      title: this.newTodo,
      completed:false,
      editing:false
    }
    );
    this.newTodo = "";
    this.idTodo++;
  }
  // Méthode permettant de supprimer Toto
  deleteTodo(idTodo:number): void{
    // console.log(idTodo);
    // Filter retourne tous les todo qui n'ont pas l'id du toto que je veux supprimer
    // Donc, ça va me supprimer le todo avec idTodo en argument
    this.listTodo = this.listTodo.filter(todo => todo.id != idTodo);
  }

  //Méthode permettant de mettre en édition un Todo pou afficher l'input type text
  editTodo(todo:Todo) : void{
    this.cacheBeforeEditTodo = todo.title;
    todo.editing = true;
  }

  cancelEditTodo(todo:Todo) : void{
    todo.title = this.cacheBeforeEditTodo;
    todo.editing = false;
  }

  doneEditTodo(todo:Todo) : void {
    if(todo.title.trim().length === 0){
      todo.title = this.cacheBeforeEditTodo;
    }
    todo.editing = false; // Je précise que l'édition est finie
  }

  todoRemaining() : number {

    return this.listTodo.filter(todo => todo.completed == false).length;

  }

  listOfTodoFiltered() : Todo[] {

    if(this.filter === "All") {
      return this.listTodo;
    }else if(this.filter === "Active"){
      return this.listTodo.filter(todo => !todo.completed)
    }else{
      return this.listTodo.filter(todo => todo.completed)
    }
  }

  clearCompleted() {
    this.listTodo = this.listTodo.filter(todo => !todo.completed);
  }

  atLeastOneTodoCompleted(){
    return this.listTodo.filter(todo => todo.completed).length > 0;
  }

  checkAll(){
    this.listTodo.forEach(
      todo => todo.completed = (<HTMLInputElement> event.target).checked
    )
  }


}

// Capter l'évènement change sur l'input type checkbox
// modifier le todo et mettre la clef completed à true
// avec ngClass ajouter la classe .completed si le todo a la clef completed à true