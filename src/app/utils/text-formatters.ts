export class TextFormatters {
  static ToTitleCase(text: string) {
    text = text
      .toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    return text;
  }

  static GetRomanNumeral(number: number) {
    switch (number) {
      case 1:
        return 'I';
      case 2:
        return 'II';
      case 3:
        return 'III';
      case 4:
        return 'IV';
      case 5:
        return 'V';
      case 6:
        return 'VI';
      case 7:
        return 'VII';
      case 8:
        return 'VIII';
      default:
        return '';
    }
  }

  static GetSmogonLetters(generationNumber?: number) {
    switch (generationNumber) {
      case 1:
        return 'rb';
      case 2:
        return 'gs';
      case 3:
        return 'rs';
      case 4:
        return 'dp';
      case 5:
        return 'bw';
      case 6:
        return 'xy';
      case 7:
        return 'sm';
      case 8:
        return 'ss';
      default:
        return '';
    }
  }

  static FormatNumberOfDigits(number: number, numberOfDigits: number) {
    var zeroes = new Array(numberOfDigits + 1).join('0');
    return (zeroes + number).slice(-numberOfDigits);
  }

  static GetSerebiiPokemonIdentifier(
    pokemonName: string,
    pokemonNumber: number,
    generationNumber?: number
  ) {
    if (generationNumber < 8) {
      let formattedNumber = this.FormatNumberOfDigits(pokemonNumber, 3);
      return formattedNumber + '.shtml';
    } else {
      return pokemonName + '/';
    }
  }

  static GetSerebiiUrl(generationNumber?: number) {
    switch (generationNumber) {
      case 1:
        return 'pokedex';
      case 2:
        return 'pokedex-gs';
      case 3:
        return 'pokedex-rs';
      case 4:
        return 'pokedex-dp';
      case 5:
        return 'pokedex-bw';
      case 6:
        return 'pokedex-xy';
      case 7:
        return 'pokedex-sm';
      case 8:
        return 'pokedex-swsh';
      default:
        return '';
    }
  }

  static GetPokemonDbSpriteGenNames(generationNumber?: number) {
    switch (generationNumber) {
      case 1:
        return 'red-blue';
      case 2:
        return 'gold';
      case 3:
        return 'ruby-sapphire';
      case 4:
        return 'diamond-pearl';
      case 5:
        return 'black-white';
      case 6:
        return 'x-y';
      case 7:
        return 'sun-moon';
      case 8:
        return 'sword-shield';
      default:
        return '';
    }
  }

  static GetPokemonDbGenerationRegionNames(generationNumber?: number) {
    switch (generationNumber) {
      case 1:
        return '';
      case 2:
        return 'johto';
      case 3:
        return 'hoenn';
      case 4:
        return 'sinnoh';
      case 5:
        return 'unova';
      case 6:
        return 'kalos';
      case 7:
        return 'alola';
      case 8:
        return 'galar';
      default:
        return '';
    }
  }

  static GetGameNames(generationNumber: number) {
    switch (generationNumber) {
      case 1:
        return 'Red/Blue/Yellow';
      case 2:
        return 'Gold/Silver/Crystal';
      case 3:
        return 'Ruby/Sapphire/Emerald & FireRed/LeafGreen';
      case 4:
        return 'Diamond/Pearl/Platinum & HeartGold/SoulSilver';
      case 5:
        return 'Black/White & Black 2/White 2';
      case 6:
        return 'X/Y & Omega Ruby/Alpha Sapphire';
      case 7:
        return 'Sun/Moon & Ultra Sun/Ultra Moon';
      case 8:
        return 'Sword/Shield';
      default:
        return 'Invalid generation number.';
    }
  }

  static convertNidoranToSymbol(name: string) {
    name = name.replace('-m', '♂');
    name = name.replace('-f', '♀');
    return name;
  }

  static convertNidoranToText(name: string) {
    name = name.replace('♂', '-m');
    name = name.replace('♀', '-f');
    return name;
  }
}
