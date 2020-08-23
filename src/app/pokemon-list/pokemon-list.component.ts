import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/Pokemon';
import { PokeApiService } from 'src/app/poke-api.service';
import { TextFormat } from 'src/TextFormat';

@Component({
    selector: 'app-pokemon-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

    pokemon: Pokemon[] = [];
    columnsToDisplay: string[] = ["number", "name", "moveset-link", "evolution-info"];
    availableSites: string[] = ["bulbapedia", "serebii", "smogon", "pokemondb"]
    selectedSite: string;
    searchText: string = '';

    constructor(private pokeApiService: PokeApiService) {
    }

    ngOnInit() {
        this.pokeApiService.getAllPokemon().then((response) => {
            this.pokemon = response[0];
        });
    }
}


/*

Kanto: 151
Johto: 251
Hoenn: 386
Sinnoh: 493
Unova: 649
Kalos: 721
Alola: 802
Ultra Alola: 807
Let’s Go Kanto: 809
Galar: 890
Isle of Armor: 893

*/