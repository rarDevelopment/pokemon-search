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
    return this.api.getPokemonSpeciesList().then((response) => {
      console.log("species response", response);
      this.pokemon.push(response.results.map(p => {

        let urlSegments = p.url.split('/');
        let number = urlSegments[urlSegments.length - 2];

        return this.buildPokemonFromData(p.name, number)
      }));
      return this.pokemon;
    });
  }
  getPokemon(name: string) {
    return this.api.getPokemonByName(name)
      .then(function (response) {
        console.log("found pokemon for name" + name, response);
      });
  }

  buildPokemonFromData(name, number: number) {
    return {
      name: name,
      number: number,
      evolutionLink: "#",
      movesetLink: "#"
    } as Pokemon;
  }
}
