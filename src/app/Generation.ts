import { TextFormat } from './TextFormat';

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
        this.romanNumeral = TextFormat.GetRomanNumeral(id);
        this.gameLetters = TextFormat.GetSmogonLetters(id);
        this.games = TextFormat.GetGameNames(id);
    }
}