// filter.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
    /**
     * Transform
     *
     * @param {any[]} items
     * @param {string} searchText
     * @returns {any[]}
     */
    transform(items: any[], searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLocaleLowerCase();

        return items.filter(pokemonToFilter => {
            if (!isNaN(Number(searchText))) {
                return pokemonToFilter.number.toLocaleLowerCase().includes(searchText)
            }
            return pokemonToFilter.name.toLocaleLowerCase().includes(searchText);
        });
    }
}