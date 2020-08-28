import { TemplateKeywords } from "src/app/TemplateKeywords";
import { Site } from "src/app/Site";

export class Sites {
    static Bulbapedia: Site = new Site(
        "bulbapedia",
        "https://bulbapedia.bulbagarden.net/wiki/",
        `https://bulbapedia.bulbagarden.net/wiki/${TemplateKeywords.PokemonName}_(Pok%C3%A9mon)#Game_locations`,
        `https://bulbapedia.bulbagarden.net/wiki/${TemplateKeywords.PokemonName}_(Pok%C3%A9mon)#Type_effectiveness`,
        `https://bulbapedia.bulbagarden.net/wiki/${TemplateKeywords.PokemonName}_(Pok%C3%A9mon)#Learnset${TemplateKeywords.Generation}`,
        `https://bulbapedia.bulbagarden.net/wiki/${TemplateKeywords.PokemonName}_(Pok%C3%A9mon)#Evolution`
    );

    static Smogon: Site = new Site(
        "smogon",
        "http://www.smogon.com/dex/",
        `http://www.smogon.com/dex/${TemplateKeywords.Generation}/pokemon/${TemplateKeywords.PokemonName}/`,
        `http://www.smogon.com/dex/${TemplateKeywords.Generation}/pokemon/${TemplateKeywords.PokemonName}/`,
        `http://www.smogon.com/dex/${TemplateKeywords.Generation}/pokemon/${TemplateKeywords.PokemonName}/`,
        `http://www.smogon.com/dex/${TemplateKeywords.Generation}/pokemon/${TemplateKeywords.PokemonName}/`
    );

    static PokemonDB: Site = new Site(
        "pokemondb",
        "http://www.smogon.com/dex/",
        `http://pokemondb.net/pokedex/${TemplateKeywords.PokemonName}#dex-locations`,
        `http://pokemondb.net/pokedex/${TemplateKeywords.PokemonName}#dex-basics`,
        `http://pokemondb.net/pokedex/${TemplateKeywords.PokemonName}/moves/${TemplateKeywords.Generation}`,
        `http://pokemondb.net/pokedex/${TemplateKeywords.PokemonName}#dex-evolution`,
    );

    public static AllSites: Site[] = [Sites.Bulbapedia, Sites.Smogon];
}