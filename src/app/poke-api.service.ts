import { Injectable } from '@angular/core';
import { Pokedex } from 'pokeapi-js-wrapper';
import { Pokemon } from '../Pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private api: Pokedex;

  constructor() {
    this.api = new Pokedex();
  }

  async getAllPokemon(pokemonCount: number) {
    const interval = {
      limit: pokemonCount,
      offset: 0,
    };
    const response = await this.api.getPokemonSpeciesList(interval);

    const pokemon = response.results.map((p) => {
      const urlSegments = p.url.split('/');
      const number = urlSegments[urlSegments.length - 2];
      return this.buildPokemonFromData(p.name, parseInt(number));
    });
    return pokemon;
  }

  buildPokemonFromData(name: string, number: number) {
    return {
      name: name,
      number: number,
    } as Pokemon;
  }
}
