import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  events: { title: string; date: string }[] = [];  // Pole pro události
  newEvent = { title: '', date: '' };  // Nová událost
  isEditing = false;  // Příznak, zda se upravuje událost
  editIndex: number | null = null;  // Index události, která se upravuje

  constructor() {}

  ngOnInit() {
    // Načtení uložených událostí z localStorage při spuštění
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      this.events = JSON.parse(storedEvents);  // Načteme události z localStorage
    }
  }

  // Přidání nové události nebo úprava existující
  addEvent() {
    if (!this.newEvent.title.trim() || !this.newEvent.date.trim()) {
      alert('Prosím zadejte název a datum události.');
      return;  // Pokud není vyplněno, zabráníme přidání
    }

    if (this.isEditing) {
      // Pokud se upravuje, aktualizuje existující událost
      if (this.editIndex !== null) {
        this.events[this.editIndex] = { ...this.newEvent };  // Aktualizujeme událost
        this.isEditing = false;
        this.editIndex = null;
      }
    } else {
      // Pokud se přidává nová událost
      this.events.push({ ...this.newEvent });
    }

    this.newEvent = { title: '', date: '' };  // Vyprázdnění formuláře po přidání
    this.saveEvents();  // Uložení událostí do localStorage
  }

  // Smazání události
  deleteEvent(index: number) {
    this.events.splice(index, 1);  // Odstranění události podle indexu
    this.saveEvents();  // Uložení změn do localStorage
  }

  // Úprava existující události
  editEvent(index: number) {
    this.newEvent = { ...this.events[index] };  // Načteme data události pro úpravy
    this.isEditing = true;
    this.editIndex = index;
  }

  // Uložení událostí do localStorage
  saveEvents() {
    localStorage.setItem('events', JSON.stringify(this.events));  // Uložení seznamu událostí
  }
}
