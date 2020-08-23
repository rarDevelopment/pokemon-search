import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/Pokemon';
import { PokeApiService } from 'src/app/poke-api.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemon: Pokemon[] = [];
  columnsToDisplay: string[] = ["number", "name", "moveset-link", "evolution-info"];


  constructor(private pokeApiService: PokeApiService) {
  }

  ngOnInit() {
    this.pokeApiService.getAllPokemon().then((response) => {
      this.pokemon = response[0];
    });
  }
}
