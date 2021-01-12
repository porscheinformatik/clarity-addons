import {COMPONENT_MAP} from "../../utils/component-list";

export class ClarityDocComponent {
    title: string = "";

    constructor(componentName: string) {
        let component = COMPONENT_MAP.get(componentName);
        this.populateComponentDetails(component.text);
    }

    populateComponentDetails(title: string) {
        this.title = title;
    }
}
