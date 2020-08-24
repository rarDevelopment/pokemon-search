import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/Pokemon';
import { PokeApiService } from 'src/app/poke-api.service';
import { TextFormat } from 'src/app/TextFormat';
import { Sites } from 'src/app/Sites';
import { Site } from 'src/app/Site';
import { TemplateKeywords } from 'src/app/TemplateKeywords';


@Component({
    selector: 'app-pokemon-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

    pokemon: Pokemon[] = [];
    columnsToDisplay: string[] = ["image", "number", "name", "evolution-link", "location-link", "effectiveness-link", "learnset-link"];
    searchText: string = '';
    isLoading: boolean;

    availableSites: Site[] = [Sites.Bulbapedia];//, "serebii", "smogon", "pokemondb"]
    currentGen: number = 8;
    generationNumbers: number[] = Array(this.currentGen);

    selectedSite: string = Sites.Bulbapedia.name; //TODO: change this to be a parameter
    selectedGen: number = 8; //TODO: change this one to be a parameter

    constructor(private pokeApiService: PokeApiService) {
    }

    ngOnInit() {
        this.loadPokemon();
    }

    loadPokemon() {
        this.isLoading = true;
        this.pokeApiService.getAllPokemon().then((response) => {
            let data = response[0];
            this.pokemon = data.map(p => {
                return {
                    name: p.name,
                    displayName: TextFormat.toTitleCase(p.name),
                    number: p.number,
                    evolutionUrls: this.buildEvolutionUrls(p.name, p.number),
                    locationUrls: this.buildLocationUrls(p.name, p.number),
                    effectivenessUrls: this.buildEffectivenessUrls(p.name, p.number),
                    learnsetUrls: this.buildLearnsetUrls(p.name, p.number)
                } as Pokemon;
            })
            this.isLoading = false;
        });
    }

    buildLocationUrls(name: string, number: number) {
        let bulbaUrl = Sites.Bulbapedia.locationUrlTemplate;
        bulbaUrl = bulbaUrl.replace(TemplateKeywords.PokemonName, name);
        return {
            [Sites.Bulbapedia.name]: bulbaUrl,
        };
    }
    buildEvolutionUrls(name: string, number: number) {
        let bulbaUrl = Sites.Bulbapedia.evolutionUrlTemplate;
        bulbaUrl = bulbaUrl.replace(TemplateKeywords.PokemonName, name);
        return {
            [Sites.Bulbapedia.name]: bulbaUrl,
        };
    }
    buildEffectivenessUrls(name: string, number: number) {
        let bulbaUrl = Sites.Bulbapedia.effectivenessUrlTemplate;
        bulbaUrl = bulbaUrl.replace(TemplateKeywords.PokemonName, name);
        return {
            [Sites.Bulbapedia.name]: bulbaUrl,
        };
    }
    buildLearnsetUrls(name: string, number: number) {
        let bulbaUrl = Sites.Bulbapedia.learnsetUrlTemplate;
        bulbaUrl = bulbaUrl.replace(TemplateKeywords.PokemonName, name);
        if (this.selectedGen !== this.currentGen) {
            //bulbapedia doesn't use a different url for current gen learnsets
            bulbaUrl = bulbaUrl.replace("#Learnset", "");
            bulbaUrl = bulbaUrl.replace(TemplateKeywords.Generation, `/Generation_${TextFormat.getRomanNumeral(this.selectedGen)}_learnset#By_leveling_up`);
        }
        else {
            bulbaUrl = bulbaUrl.replace(TemplateKeywords.Generation, "");
        }
        return {
            [Sites.Bulbapedia.name]: bulbaUrl,
        };
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