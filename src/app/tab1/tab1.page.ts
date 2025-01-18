import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  // Proměnná pro uchovávání úkolů
  public todoList: { id: number, task: string, completed: boolean }[] = [];
  public newTask: string = ''; // Pro zadávání nových úkolů

  constructor() {
    // Načítání úkolů při startu aplikace
    this.loadTasks();
  }

  // Načítání úkolů z localStorage
  loadTasks() {
    const savedTasks = localStorage.getItem('todoList_tab1');
    if (savedTasks) {
      this.todoList = JSON.parse(savedTasks); // Načte uložené úkoly
    }
  }

  // Uložení úkolů do localStorage
  saveTasks() {
    localStorage.setItem('todoList_tab1', JSON.stringify(this.todoList));
  }

  // Přidání nového úkolu
  addTask() {
    if (this.newTask.trim() === '') {
      return; // Zabráníme přidání prázdného úkolu
    }
    const newId = this.todoList.length > 0 ? this.todoList[this.todoList.length - 1].id + 1 : 1;
    this.todoList.push({ id: newId, task: this.newTask, completed: false });
    this.newTask = ''; // Vymazání pole po přidání úkolu
    this.saveTasks(); // Uložení úkolů do localStorage
  }

  // Mazání úkolu
  deleteTask(id: number) {
    this.todoList = this.todoList.filter(task => task.id !== id);
    this.saveTasks(); // Uložení po odstranění úkolu
  }

  // Přepnutí stavu dokončení úkolu
  toggleComplete(id: number) {
    const task = this.todoList.find(task => task.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks(); // Uložení po změně stavu úkolu
    }
  }
}
