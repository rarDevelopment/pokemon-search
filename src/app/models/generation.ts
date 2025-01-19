import { TextFormatters } from '../utils/text-formatters';

export class Generation {
  id: number;
  name: string;
  romanNumeral: string;
  pokemonCount: number;
  games: string;
  gameLetters: string;

  constructor(id: number, pokemonCount: number) {
    this.id = id;
    this.pokemonCount = pokemonCount;
    this.name = `Generation ${id}`;
    this.romanNumeral = TextFormatters.GetRomanNumeral(id);
    this.gameLetters = TextFormatters.GetSmogonLetters(id);
    this.games = TextFormatters.GetGameNames(id);
  }
}
