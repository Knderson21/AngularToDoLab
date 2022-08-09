import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  tasks: Todo[] = [
    {
      task: "Drink Baja Blast",
      completed: false
    },
    {
      task: "Play Video Games",
      completed: false
    },
    {
      task: "Sleep in past alarm",
      completed: true
    }
  ];


  filter:string = "";

  completeTask(index:number):void{
    this.tasks[this.findCorrectIndex(index)].completed = true;
  }

  addTodo(form: NgForm){
    let newTodo:Todo = {
      task: form.form.value.Task,
      completed: false
    };
    this.tasks.push(newTodo);

  }

  displayCongrats():boolean{
    //is empty
    if(this.tasks.length == 0){
      return true;
    }

    //if any task is incomplete
    for(let i = 0; i<this.tasks.length; i++){
      if(this.tasks[i].completed == false){
        return false;
      }
    }

    //comfirmed all are complete
    return true;
      
  }

  removeTask(index: number):void{
    this.tasks.splice(this.findCorrectIndex(index),1);
  }


  editTask(form: NgForm, index:number){
    this.tasks[this.findCorrectIndex(index)].task = form.form.value.Task;
  }

  filterTasks(form:NgForm):void{
    this.filter = form.form.value.Filter.toLowerCase();
    
  }

  getFilter():Todo[] {
    let newTodos: Todo[] = [];
    this.tasks.forEach((t:Todo) => {
      if(t.task.toLowerCase().includes(this.filter)){
        newTodos.push(t);
      }
    });

    // console.log(newTodos);
    return newTodos;

  }

  findCorrectIndex(index:number):number{
    let filteredTask: Todo = this.getFilter()[index];
    let result:number = this.tasks.findIndex((t:Todo) =>{
      return t.completed == filteredTask.completed && t.task == filteredTask.task;
    });

    return result;
  }
}
