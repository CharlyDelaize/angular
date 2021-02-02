import { Injectable } from '@angular/core';
import { Todo } from '../interface/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  // Ce service est responsable de nous renvoyer la liste de taches en cours
  constructor() { }
  // Méthode esponsable de nous envoyer les taches en cours
  getTodo = () : Todo[] => {
    return [
      {
        "id" : 1,
        "title" : "Ma super tache de la journée toto",
        "completed" : false,
        "editing" : false
      },
      {
        "id" : 2,
        "title" : "Autre tache importante aloha",
        "completed" : false,
        "editing" : false
      },
      {
        "id" : 3,
        "title" : "Tache à faire mec",
        "completed" : false,
        "editing" : false
      },
    ];
  }
}
