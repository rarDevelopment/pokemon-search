export class TextFormat {

    static ToTitleCase(text) {
        text = text.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        return text;
    }

    static GetRomanNumeral(number) {
        switch (number) {
            case 1:
                return "I";
                break;
            case 2:
                return "II";
                break;
            case 3:
                return "III";
                break;
            case 4:
                return "IV";
                break;
            case 5:
                return "V";
                break;
            case 6:
                return "VI";
                break;
            case 7:
                return "VII";
            case 8:
                return "VIII";
            default:
                return "";
                break;
        }
    }

    static GetSmogonLetters(generationNumber: number) {
        switch (generationNumber) {
            case 1:
                return "rb";
                break;
            case 2:
                return "gs";
                break;
            case 3:
                return "rs";
                break;
            case 4:
                return "dp";
                break;
            case 5:
                return "bw";
                break;
            case 6:
                return "xy";
                break;
            case 7:
                return "sm";
                break;
            case 8:
                return "ss";
                break;
            default:
                return "";
                break;
        }
    }
    static GetGameNames(generationNumber: number) {
        switch (generationNumber) {
            case 1:
                return "Red/Blue/Yellow";
                break;
            case 2:
                return "Gold/Silver/Crystal";
                break;
            case 3:
                return "Ruby/Sapphire/Emerald & FireRed/LeafGreen";
                break;
            case 4:
                return "Diamond/Pearl/Platinum & HeartGold/SoulSilver";
                break;
            case 5:
                return "Black/White & Black 2/White 2";
                break;
            case 6:
                return "X/Y & Omega Ruby/Alpha Sapphire";
                break;
            case 7:
                return "Sun/Moon & Ultra Sun/Ultra Moon";
                break;
            case 8:
                return "Sword/Shield";
                break;
            default:
                return "Invalid generation number.";
                break;
        }
    }

    static convertNidoranToSymbol(name: string) {
        name = name.replace("-m", "♂");
        name = name.replace("-f", "♀");
        return name;
    }

    static convertNidoranToText(name: string) {
        name = name.replace("♂", "-m");
        name = name.replace("♀", "-f");
        return name;
    }
}