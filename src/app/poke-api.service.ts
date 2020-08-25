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

    getAllPokemon(pokemonCount: number) {
        const interval = {
            limit: pokemonCount,
            offset: 0
        };
        return this.api.getPokemonSpeciesList(interval).then((response) => {
            this.pokemon = response.results.map(p => {
                let urlSegments = p.url.split('/');
                let number = urlSegments[urlSegments.length - 2];
                return this.buildPokemonFromData(p.name, number);
            });
            console.log("end result", this.pokemon);
            return this.pokemon;
        });
    }
    getPokemon(name: string) {
        return this.api.getPokemonByName(name)
            .then(function (response) {
                console.log("found pokemon for name" + name, response);
            });
    }

    buildPokemonFromData(name: string, number: number) {
        return {
            name: name,
            number: number
        } as Pokemon;
    }
}
