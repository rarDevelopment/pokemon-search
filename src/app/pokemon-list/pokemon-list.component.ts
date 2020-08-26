import { Component, OnInit, ViewChild } from '@angular/core';
import { Pokemon } from 'src/Pokemon';
import { PokeApiService } from 'src/app/poke-api.service';
import { TextFormat } from 'src/app/TextFormat';
import { Sites } from 'src/app/Sites';
import { Site } from 'src/app/Site';
import { TemplateKeywords } from 'src/app/TemplateKeywords';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Generation } from '../Generation';

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
    isError: boolean = false;

    availableSites: Site[] = [Sites.Bulbapedia];//, "serebii", "smogon", "pokemondb"]
    currentGen: number = 8;
    generationNumbers: number[] = Array(this.currentGen);
    generations: Generation[] =
        [new Generation(1, 151),
        new Generation(2, 251),
        new Generation(3, 386),
        new Generation(4, 493),
        new Generation(5, 649),
        new Generation(6, 721),
        new Generation(7, 807),
        new Generation(8, 893)];

    pokemonDataSource: MatTableDataSource<Pokemon> = new MatTableDataSource();
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    selectedSite: string = Sites.Bulbapedia.name; //TODO: change this to be a parameter
    selectedGenNumber: number = 8;
    selectedGeneration: Generation;

    constructor(private pokeApiService: PokeApiService) {
    }

    ngOnInit() {
        this.loadPokemon();
    }

    loadPokemon() {

        this.selectedGeneration = this.getGenerationForNumber(this.selectedGenNumber);
        if (this.selectedGeneration) {
            this.isLoading = true;
            this.pokeApiService.getAllPokemon(this.selectedGeneration.pokemonCount).then((response) => {
                let data = response;
                console.log("this right here", data);
                const pokemon = data.map(p => {
                    return {
                        name: p.name,
                        displayName: TextFormat.ToTitleCase(p.name),
                        number: p.number,
                        evolutionUrls: this.buildEvolutionUrls(p.name, p.number),
                        locationUrls: this.buildLocationUrls(p.name, p.number),
                        effectivenessUrls: this.buildEffectivenessUrls(p.name, p.number),
                        learnsetUrls: this.buildLearnsetUrls(p.name, p.number)
                    } as Pokemon;
                });
                this.pokemonDataSource = new MatTableDataSource(pokemon);
                this.pokemonDataSource.paginator = this.paginator;
                this.pokemonDataSource.sort = this.sort;
                this.isLoading = false;
            });
        }
        else {
            this.isError = true;
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.pokemonDataSource.filter = filterValue.trim().toLowerCase();

        if (this.pokemonDataSource.paginator) {
            this.pokemonDataSource.paginator.firstPage();
        }
    }

    getGenerationForNumber(genNumber: number) {
        console.log("gen", genNumber);
        return this.generations.find(g => g.id == genNumber);
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
        if (this.selectedGenNumber !== this.currentGen) {
            //bulbapedia doesn't use a different url for current gen learnsets
            bulbaUrl = bulbaUrl.replace("#Learnset", "");
            bulbaUrl = bulbaUrl.replace(TemplateKeywords.Generation, `/Generation_${TextFormat.GetRomanNumeral(this.selectedGenNumber)}_learnset#By_leveling_up`);
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

Thanks to Mason <3

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