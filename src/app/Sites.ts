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

    public static AllSites: Site[] = [Sites.Bulbapedia, Sites.Smogon];
}