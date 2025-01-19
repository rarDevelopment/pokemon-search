import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Generation } from '../Generation';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../../Pokemon';
import { Sites } from '../Sites';
import { Site } from '../Site';
import { PokeApiService } from '../poke-api.service';
import { TemplateKeywords } from '../TemplateKeywords';
import { TextFormat } from '../TextFormat';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatPaginator,
    MatFormField,
    MatSelectModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class PokemonListComponent implements OnInit {
  pokemon: Pokemon[] = [];
  columnsToDisplay: string[] = [
    'image',
    'number',
    'name',
    'evolution-link',
    // 'location-link',
    // 'effectiveness-link',
    // 'learnset-link',
  ];
  searchText: string = '';
  isLoading: boolean = false;
  isError: boolean = false;

  availableSites: Site[] = [
    Sites.Bulbapedia,
    Sites.PokemonDB,
    Sites.Smogon,
    Sites.Serebii,
  ];
  currentGen: number = 9;
  generationNumbers: number[] = Array(this.currentGen);
  generations: Generation[] = [
    new Generation(1, 151),
    new Generation(2, 251),
    new Generation(3, 386),
    new Generation(4, 493),
    new Generation(5, 649),
    new Generation(6, 721),
    new Generation(7, 809),
    new Generation(8, 905),
    new Generation(9, 1025),
  ];

  pokemonDataSource: MatTableDataSource<Pokemon> = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    new MatPaginator(null, null, null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort();

  selectedSiteName: string = Sites.Bulbapedia.name; //TODO: change this to be a parameter
  selectedGenNumber: number = 9; //TODO: change this to be a parameter
  selectedGeneration: Generation | undefined;
  selectedSite: Site = Sites.Bulbapedia;

  constructor(
    private pokeApiService: PokeApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPokemon();
    this.route.queryParamMap.subscribe((params) => {
      let urlGen = params.get('gen');
      if (urlGen) {
        let genNumber = parseInt(urlGen);
        if (genNumber) {
          this.selectedGenNumber = genNumber;
          this.loadPokemon();
        }
      }
      let urlSite = params.get('site');
      console.log('param', urlSite);
      if (urlSite) {
        if (
          Sites.AllSites.find(
            (s) => s.name.toLowerCase() == urlSite.trim().toLowerCase()
          )
        ) {
          this.selectedSiteName = urlSite;
          this.loadPokemon();
        }
      }
    });
  }

  navigateToParams(queryParams) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
      skipLocationChange: false,
    });
  }

  navigateToGen(gen: number) {
    let queryParams = {
      gen: gen,
    };
    this.navigateToParams(queryParams);
  }

  navigateToSite(site: string) {
    let queryParams = {
      site: site,
    };
    this.navigateToParams(queryParams);
  }

  loadPokemon() {
    this.selectedSite = this.getSiteByName(this.selectedSiteName);
    this.selectedGeneration = this.getGenerationForNumber(
      this.selectedGenNumber
    );
    if (this.selectedSite && this.selectedGeneration) {
      this.isLoading = true;
      this.pokeApiService
        .getAllPokemon(this.selectedGeneration.pokemonCount)
        .then((response) => {
          let data = response;
          const pokemon = data.map((p) => {
            return {
              imgUrl: `https://img.pokemondb.net/sprites/home/normal/2x/avif/${p.name}.avif`,
              name: p.name,
              displayName: TextFormat.ToTitleCase(p.name),
              number: p.number,
              evolutionUrls: this.buildEvolutionUrls(
                p.name,
                p.number,
                this.selectedGeneration?.id
              ),
              locationUrls: this.buildLocationUrls(
                p.name,
                p.number,
                this.selectedGeneration?.id
              ),
              effectivenessUrls: this.buildEffectivenessUrls(
                p.name,
                p.number,
                this.selectedGeneration?.id
              ),
              learnsetUrls: this.buildLearnsetUrls(
                p.name,
                p.number,
                this.selectedGeneration?.id
              ),
            } as Pokemon;
          });
          this.pokemonDataSource = new MatTableDataSource(pokemon);
          this.pokemonDataSource.paginator = this.paginator;
          this.pokemonDataSource.sort = this.sort;
          this.isLoading = false;
        });
    } else {
      this.isError = true;
      console.error(
        `Generation:\nNumber: ${this.selectedGenNumber}\nGeneration:${this.selectedGeneration}`
      );
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
    return Sites.AllSites.find((s) => s.name == selectedSiteName)!;
  }

  getGenerationForNumber(genNumber: number) {
    return this.generations.find((g) => g.id == genNumber);
  }

  buildLocationUrls(
    name: string,
    pokemonNumber: number,
    generationNumber?: number
  ) {
    let serebiiIdentifier = TextFormat.GetSerebiiPokemonIdentifier(
      name,
      pokemonNumber,
      generationNumber
    );
    let serebiiUrl = Sites.Serebii.effectivenessUrlTemplate
      .replace(TemplateKeywords.PokemonName, serebiiIdentifier)
      .replace(
        TemplateKeywords.Generation,
        TextFormat.GetSerebiiUrl(generationNumber)
      );
    return {
      [Sites.Bulbapedia.name]: Sites.Bulbapedia.locationUrlTemplate.replace(
        TemplateKeywords.PokemonName,
        name
      ),
      [Sites.Smogon.name]: '',
      [Sites.PokemonDB.name]: Sites.PokemonDB.locationUrlTemplate.replace(
        TemplateKeywords.PokemonName,
        name
      ),
      [Sites.Serebii.name]: serebiiUrl,
    };
  }
  buildEvolutionUrls(
    name: string,
    pokemonNumber: number,
    generationNumber?: number
  ) {
    let serebiiIdentifier = TextFormat.GetSerebiiPokemonIdentifier(
      name,
      pokemonNumber,
      generationNumber
    );
    let serebiiUrl = Sites.Serebii.effectivenessUrlTemplate
      .replace(TemplateKeywords.PokemonName, serebiiIdentifier)
      .replace(
        TemplateKeywords.Generation,
        TextFormat.GetSerebiiUrl(generationNumber)
      );
    return {
      [Sites.Bulbapedia.name]: Sites.Bulbapedia.evolutionUrlTemplate.replace(
        TemplateKeywords.PokemonName,
        name
      ),
      [Sites.Smogon.name]: Sites.Smogon.evolutionUrlTemplate
        .replace(TemplateKeywords.PokemonName, name)
        .replace(
          TemplateKeywords.Generation,
          TextFormat.GetSmogonLetters(generationNumber)
        ),
      [Sites.PokemonDB.name]: Sites.PokemonDB.evolutionUrlTemplate.replace(
        TemplateKeywords.PokemonName,
        name
      ),
      [Sites.Serebii.name]: serebiiUrl,
    };
  }
  buildEffectivenessUrls(
    name: string,
    pokemonNumber: number,
    generationNumber?: number
  ) {
    let serebiiIdentifier = TextFormat.GetSerebiiPokemonIdentifier(
      name,
      pokemonNumber,
      generationNumber
    );
    let serebiiUrl = Sites.Serebii.effectivenessUrlTemplate
      .replace(TemplateKeywords.PokemonName, serebiiIdentifier)
      .replace(
        TemplateKeywords.Generation,
        TextFormat.GetSerebiiUrl(generationNumber)
      );
    return {
      [Sites.Bulbapedia.name]:
        Sites.Bulbapedia.effectivenessUrlTemplate.replace(
          TemplateKeywords.PokemonName,
          name
        ),
      [Sites.Smogon.name]: '',
      [Sites.PokemonDB.name]: Sites.PokemonDB.effectivenessUrlTemplate.replace(
        TemplateKeywords.PokemonName,
        name
      ),
      [Sites.Serebii.name]: serebiiUrl,
    };
  }
  buildLearnsetUrls(
    name: string,
    pokemonNumber: number,
    generationNumber?: number
  ) {
    let serebiiIdentifier = TextFormat.GetSerebiiPokemonIdentifier(
      name,
      pokemonNumber,
      generationNumber
    );
    let serebiiUrl = Sites.Serebii.effectivenessUrlTemplate
      .replace(TemplateKeywords.PokemonName, serebiiIdentifier)
      .replace(
        TemplateKeywords.Generation,
        TextFormat.GetSerebiiUrl(generationNumber)
      );
    let bulbaUrl = Sites.Bulbapedia.learnsetUrlTemplate.replace(
      TemplateKeywords.PokemonName,
      name
    );
    if (this.selectedGenNumber !== this.currentGen) {
      //bulbapedia doesn't use a different url for current gen learnsets
      bulbaUrl = bulbaUrl.replace('#Learnset', '');
      bulbaUrl = bulbaUrl.replace(
        TemplateKeywords.Generation,
        `/Generation_${TextFormat.GetRomanNumeral(
          this.selectedGenNumber
        )}_learnset#By_leveling_up`
      );
    } else {
      bulbaUrl = bulbaUrl.replace(TemplateKeywords.Generation, '');
    }
    return {
      [Sites.Bulbapedia.name]: bulbaUrl,
      [Sites.Smogon.name]: Sites.Smogon.learnsetUrlTemplate
        .replace(TemplateKeywords.PokemonName, name)
        .replace(
          TemplateKeywords.Generation,
          TextFormat.GetSmogonLetters(generationNumber)
        ),
      [Sites.PokemonDB.name]: Sites.PokemonDB.learnsetUrlTemplate
        .replace(TemplateKeywords.PokemonName, name)
        .replace(
          TemplateKeywords.Generation,
          generationNumber?.toString() ?? ''
        ),
      [Sites.Serebii.name]: serebiiUrl,
    };
  }
  buildTypeChartUrls(generationNumber?: number) {
    return {
      [Sites.Bulbapedia.name]: Sites.Bulbapedia.typeChartUrl.replace(
        TemplateKeywords.Generation,
        generationNumber?.toString() ?? ''
      ),
      [Sites.Smogon.name]: Sites.Smogon.typeChartUrl.replace(
        TemplateKeywords.Generation,
        TextFormat.GetSmogonLetters(generationNumber)
      ),
      [Sites.PokemonDB.name]: Sites.PokemonDB.typeChartUrl.replace(
        TemplateKeywords.Generation,
        generationNumber?.toString() ?? ''
      ),
      [Sites.Serebii.name]: Sites.Serebii.typeChartUrl,
    };
  }
  buildLocationRegionUrl(generationNumber?: number) {
    return {
      [Sites.Bulbapedia.name]: Sites.Bulbapedia.locationRegionUrl.replace(
        TemplateKeywords.Generation,
        TextFormat.GetPokemonDbGenerationRegionNames(generationNumber)
      ),
      [Sites.Smogon.name]: Sites.Smogon.locationRegionUrl.replace(
        TemplateKeywords.Generation,
        TextFormat.GetPokemonDbGenerationRegionNames(generationNumber)
      ),
      [Sites.PokemonDB.name]: Sites.PokemonDB.locationRegionUrl.replace(
        TemplateKeywords.Generation,
        TextFormat.GetPokemonDbGenerationRegionNames(generationNumber)
      ),
      [Sites.Serebii.name]: Sites.Serebii.locationRegionUrl,
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
