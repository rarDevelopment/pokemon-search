import { Site } from './Site';
import { TemplateKeywords } from './TemplateKeywords';

export class Sites {
  static Bulbapedia: Site = new Site(
    'bulbapedia',
    'https://bulbapedia.bulbagarden.net/wiki/',
    `https://bulbapedia.bulbagarden.net/wiki/${TemplateKeywords.PokemonName}_(Pok%C3%A9mon)#Game_locations`,
    `https://bulbapedia.bulbagarden.net/wiki/${TemplateKeywords.PokemonName}_(Pok%C3%A9mon)#Type_effectiveness`,
    `https://bulbapedia.bulbagarden.net/wiki/${TemplateKeywords.PokemonName}_(Pok%C3%A9mon)#Learnset${TemplateKeywords.Generation}`,
    `https://bulbapedia.bulbagarden.net/wiki/${TemplateKeywords.PokemonName}_(Pok%C3%A9mon)#Evolution`,
    `http://bulbapedia.bulbagarden.net/wiki/Type#Type_chart`,
    `https://pokemondb.net/location#tab-${TemplateKeywords.Generation}`
  );

  static Smogon: Site = new Site(
    'smogon',
    'http://www.smogon.com/dex/',
    `http://www.smogon.com/dex/${TemplateKeywords.Generation}/pokemon/${TemplateKeywords.PokemonName}/`,
    `http://www.smogon.com/dex/${TemplateKeywords.Generation}/pokemon/${TemplateKeywords.PokemonName}/`,
    `http://www.smogon.com/dex/${TemplateKeywords.Generation}/pokemon/${TemplateKeywords.PokemonName}/`,
    `http://www.smogon.com/dex/${TemplateKeywords.Generation}/pokemon/${TemplateKeywords.PokemonName}/`,
    `http://www.smogon.com/dex/${TemplateKeywords.Generation}/types/`,
    `https://pokemondb.net/location#tab-${TemplateKeywords.Generation}`
  );

  static PokemonDB: Site = new Site(
    'pokemondb',
    'http://www.smogon.com/dex/',
    `http://pokemondb.net/pokedex/${TemplateKeywords.PokemonName}#dex-locations`,
    `http://pokemondb.net/pokedex/${TemplateKeywords.PokemonName}#dex-basics`,
    `http://pokemondb.net/pokedex/${TemplateKeywords.PokemonName}/moves/${TemplateKeywords.Generation}`,
    `http://pokemondb.net/pokedex/${TemplateKeywords.PokemonName}#dex-evolution`,
    `http://pokemondb.net/type/`,
    `https://pokemondb.net/location#tab-${TemplateKeywords.Generation}`
  );

  static Serebii: Site = new Site(
    'serebii',
    'https://serebii.net/',
    `https://www.serebii.net/${TemplateKeywords.Generation}/${TemplateKeywords.PokemonName}`,
    `https://www.serebii.net/${TemplateKeywords.Generation}/${TemplateKeywords.PokemonName}`,
    `https://www.serebii.net/${TemplateKeywords.Generation}/${TemplateKeywords.PokemonName}`,
    `https://www.serebii.net/${TemplateKeywords.Generation}/${TemplateKeywords.PokemonName}`,
    'https://www.serebii.net/games/type.shtml',
    'https://serebii.net/pokearth/'
  );

  public static AllSites: Site[] = [
    Sites.Bulbapedia,
    Sites.PokemonDB,
    Sites.Smogon,
    Sites.Serebii,
  ];
}
