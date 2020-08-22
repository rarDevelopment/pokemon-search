import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../Pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemon: Pokemon[] = [];
  columnsToDisplay: string[] = ["number", "name", "moveset-link", "evolution-info"];

  constructor() {
    this.pokemon.push({ name: "Bulbsaur", number: 1, movesetLink: 'https://bulbapedia.bulbagarden.net/wiki/Bulbasaur_(Pok%C3%A9mon)#Learnset' } as Pokemon);
    this.pokemon.push({ name: "Ivysaur", number: 2, movesetLink: 'https://bulbapedia.bulbagarden.net/wiki/Ivyasaur_(Pok%C3%A9mon)#Learnset' } as Pokemon);
    this.pokemon.push({ name: "Venusaur", number: 3, movesetLink: 'https://bulbapedia.bulbagarden.net/wiki/Venusaur_(Pok%C3%A9mon)#Learnset' } as Pokemon);
  }

  ngOnInit() {
  }

}
