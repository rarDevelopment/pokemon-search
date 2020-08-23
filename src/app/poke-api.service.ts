import { Injectable } from '@angular/core';
import { Pokedex } from "pokeapi-js-wrapper";
import { Pokemon } from 'src/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  api: Pokedex;
  pokemon: Pokemon[];

  constructor() {
    this.api = new Pokedex();
    this.pokemon = new Array<Pokemon>();
  }

  getAllPokemon() {
    console.log("all pokemon", this.pokemon);
    return this.api.getPokemonsList().then((response) => {
      this.pokemon.push(response.results.map(p => this.buildPokemonFromData(p)));
      return this.pokemon;
    });
  }
  getPokemon(name: string) {
    return this.api.getPokemonByName(name)
      .then(function (response) {
        console.log("found pokemon for name" + name, response);
      });
  }

  buildPokemonFromData(p) {
    return {
      name: p.name,
      number: 0,
      evolutionLink: "#",
      movesetLink: "#"
    } as Pokemon;
  }
}
