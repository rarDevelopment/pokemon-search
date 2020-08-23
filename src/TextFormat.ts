export class TextFormat {

    toTitleCase = (text) => {
        text = text.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        return text;
    }

    getRomanNumeral(number) {
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

    convertNidoranToSymbol(name: string) {
        name = name.replace("-m", "♂");
        name = name.replace("-f", "♀");
        return name;
    }

    convertNidoranToText(name: string) {
        name = name.replace("♂", "-m");
        name = name.replace("♀", "-f");
        return name;
    }
}