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

    availableSites: Site[] = [Sites.Bulbapedia, Sites.PokemonDB, Sites.Smogon];//, "serebii"]
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

    selectedSiteName: string = Sites.Bulbapedia.name; //TODO: change this to be a parameter
    selectedGenNumber: number = 8; //TODO: change this to be a parameter
    selectedGeneration: Generation;
    selectedSite: Site;

    constructor(private pokeApiService: PokeApiService) {
    }

    ngOnInit() {
        this.loadPokemon();
    }

    loadPokemon() {
        this.selectedSite = this.getSiteByName(this.selectedSiteName);
        this.selectedGeneration = this.getGenerationForNumber(this.selectedGenNumber);
        if (this.selectedSite && this.selectedGeneration) {
            this.isLoading = true;
            this.pokeApiService.getAllPokemon(this.selectedGeneration.pokemonCount).then((response) => {
                let data = response;
                const pokemon = data.map(p => {
                    return {
                        imgUrl: `https://img.pokemondb.net/artwork/${p.name}.jpg`,
                        name: p.name,
                        displayName: TextFormat.ToTitleCase(p.name),
                        number: p.number,
                        evolutionUrls: this.buildEvolutionUrls(p.name, p.number, this.selectedGeneration.id),
                        locationUrls: this.buildLocationUrls(p.name, p.number, this.selectedGeneration.id),
                        effectivenessUrls: this.buildEffectivenessUrls(p.name, p.number, this.selectedGeneration.id),
                        learnsetUrls: this.buildLearnsetUrls(p.name, p.number, this.selectedGeneration.id)
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

    getSiteByName(selectedSiteName: string): Site {
        return Sites.AllSites.find(s => s.name == selectedSiteName);
    }

    getGenerationForNumber(genNumber: number) {
        return this.generations.find(g => g.id == genNumber);
    }

    buildLocationUrls(name: string, pokemonNumber: number, generationNumber: number) {
        return {
            [Sites.Bulbapedia.name]: Sites.Bulbapedia.locationUrlTemplate.replace(TemplateKeywords.PokemonName, name),
            [Sites.Smogon.name]: "",
            [Sites.PokemonDB.name]: Sites.PokemonDB.locationUrlTemplate.replace(TemplateKeywords.PokemonName, name),
        };
    }
    buildEvolutionUrls(name: string, pokemonNumber: number, generationNumber: number) {
        return {
            [Sites.Bulbapedia.name]: Sites.Bulbapedia.evolutionUrlTemplate.replace(TemplateKeywords.PokemonName, name),
            [Sites.Smogon.name]: Sites.Smogon.evolutionUrlTemplate.replace(TemplateKeywords.PokemonName, name).replace(TemplateKeywords.Generation, TextFormat.GetSmogonLetters(generationNumber)),
            [Sites.PokemonDB.name]: Sites.PokemonDB.evolutionUrlTemplate.replace(TemplateKeywords.PokemonName, name),
        };
    }
    buildEffectivenessUrls(name: string, pokemonNumber: number, generationNumber: number) {
        return {
            [Sites.Bulbapedia.name]: Sites.Bulbapedia.effectivenessUrlTemplate.replace(TemplateKeywords.PokemonName, name),
            [Sites.Smogon.name]: "",
            [Sites.PokemonDB.name]: Sites.PokemonDB.effectivenessUrlTemplate.replace(TemplateKeywords.PokemonName, name),
        }
    }
    buildLearnsetUrls(name: string, pokemonNumber: number, generationNumber: number) {
        let bulbaUrl = Sites.Bulbapedia.learnsetUrlTemplate.replace(TemplateKeywords.PokemonName, name);
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
            [Sites.Smogon.name]: Sites.Smogon.learnsetUrlTemplate.replace(TemplateKeywords.PokemonName, name).replace(TemplateKeywords.Generation, TextFormat.GetSmogonLetters(generationNumber)),
            [Sites.PokemonDB.name]: Sites.PokemonDB.learnsetUrlTemplate.replace(TemplateKeywords.PokemonName, name).replace(TemplateKeywords.Generation, generationNumber.toString()),
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