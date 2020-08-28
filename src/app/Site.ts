export class Site {
    name: string;
    baseUrl: string;
    evolutionUrlTemplate: string;
    locationUrlTemplate: string;
    effectivenessUrlTemplate: string;
    learnsetUrlTemplate: string;
    typeChartUrl: string;
    locationRegionUrl: string;

    constructor(name: string,
        url: string,
        locationUrlTemplate: string,
        effectivenessUrlTemplate: string,
        learnsetUrlTemplate: string,
        evolutionUrlTemplate: string,
        typeChartUrl: string,
        locationRegionUrl: string
    ) {
        this.name = name;
        this.baseUrl = url;
        this.evolutionUrlTemplate = evolutionUrlTemplate;
        this.locationUrlTemplate = locationUrlTemplate;
        this.effectivenessUrlTemplate = effectivenessUrlTemplate;
        this.learnsetUrlTemplate = learnsetUrlTemplate;
        this.typeChartUrl = typeChartUrl;
        this.locationRegionUrl = locationRegionUrl;
    }
}