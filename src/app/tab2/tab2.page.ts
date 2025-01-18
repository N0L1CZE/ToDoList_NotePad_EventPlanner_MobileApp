import { Component } from '@angular/core';
import { Card } from '../card.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  cards: Card[] = [];  // Seznam všech karet
  filteredCards: Card[] = [];  // Seznam filtrovaných karet
  newCard: Card = new Card(0, '', '');  // Pro nové karty
  searchText: string = '';  // Text pro filtrování

  constructor() {
    this.loadCards();  // Načíst karty při startu aplikace
  }

  // Načíst karty z localStorage
  loadCards() {
    const storedCards = localStorage.getItem('cards');  // Načtení uložených karet
    if (storedCards) {
      this.cards = JSON.parse(storedCards);  // Převedení JSON na objekt
      this.filteredCards = [...this.cards];  // Inicializace pro filtrování
    }
  }

  // Přidat novou kartu nebo upravit existující
  addCard() {
    if (!this.newCard.title.trim() || !this.newCard.content.trim()) {
      alert('Název a obsah karty musí být vyplněny!');  // Zabránění prázdným kartám
      return;
    }

    // Pokud karta nemá ID, přidáme novou kartu
    if (!this.newCard.id) {
      const newCard = new Card(this.cards.length + 1, this.newCard.title, this.newCard.content);
      this.cards.push(newCard);
    } else {
      // Jinak upravíme existující kartu
      const index = this.cards.findIndex(card => card.id === this.newCard.id);
      if (index > -1) {
        this.cards[index] = new Card(this.newCard.id, this.newCard.title, this.newCard.content);
      }
    }

    this.saveCards();  // Uložení karet do localStorage
    this.clearForm();  // Vymazání formuláře
    this.filterCards();  // Po přidání nebo úpravě karty provádíme filtrování
  }

  // Uložit karty do localStorage
  saveCards() {
    localStorage.setItem('cards', JSON.stringify(this.cards));  // Uložení do localStorage
  }

  // Vymazat všechny karty
  clearAll() {
    this.cards = [];
    this.filteredCards = [];
    localStorage.removeItem('cards');  // Vymazání uložených karet
  }

  // Odstranit konkrétní kartu
  deleteCard(id: number) {
    this.cards = this.cards.filter(card => card.id !== id);
    this.saveCards();  // Uložení po odstranění úkolu
    this.filterCards();  // Po smazání opět provádíme filtrování
  }

  // Upravit konkrétní kartu
  editCard(card: Card) {
    this.newCard = new Card(card.id, card.title, card.content);  // Načtení dat pro editaci
  }

  // Vymazat formulář pro novou kartu
  clearForm() {
    this.newCard = new Card(0, '', '');  // Resetování formuláře
  }

  // Filtrovat karty na základě hledaného textu
  filterCards() {
    if (!this.searchText.trim()) {
      this.filteredCards = [...this.cards];  // Pokud není text pro filtrování, zobrazíme všechny karty
    } else {
      this.filteredCards = this.cards.filter(card =>
        card.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        card.content.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
}
