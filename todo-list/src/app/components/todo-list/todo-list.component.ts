import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/interface/todo';
import { TodoListService } from 'src/app/services/todo-list.service';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  //ng g s servicesng g s services
  constructor(private service: TodoListService) { }

  listTodo : Todo[]; // La liste de tache à afficher à l'écran
  newTodo : string; // La nouvelle tache que l'on va créer
  idTodo : number;
  cacheBeforeEditTodo : string;

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

  }

  addTodo() : void{

    if(this.newTodo.trim().length === 0){ // si la taille de mon champ est égal à 0
      return; // Je ne fais rien
    }

    this.listTodo.push({
      id:4,
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
      return;
    }
    todo.editing = false; // Je précise que l'édition est finie
  }

  todoRemaining() : number {

    return this.listTodo.filter(todo => todo.completed == false).length;

  }

  // Gérer le cas où je pers le focus sur l'input
  // Gérer le cas où j'appuie sur la touche esc
  // dans les deux cas si j'ai supprimé sans mettre de contenu remettre le contenu d'avant
  // propriété qui va devenir la valeur de départ

}
