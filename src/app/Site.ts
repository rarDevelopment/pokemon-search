export class Site {
    name: string;
    baseUrl: string;
    evolutionUrlTemplate: string;
    locationUrlTemplate: string;
    effectivenessUrlTemplate: string;
    learnsetUrlTemplate: string;

    constructor(name: string, url: string, locationUrlTemplate: string, effectivenessUrlTemplate: string, learnsetUrlTemplate: string, evolutionUrlTemplate: string) {
        this.name = name;
        this.baseUrl = url;
        this.evolutionUrlTemplate = evolutionUrlTemplate;
        this.locationUrlTemplate = locationUrlTemplate;
        this.effectivenessUrlTemplate = effectivenessUrlTemplate;
        this.learnsetUrlTemplate = learnsetUrlTemplate;
    }
}