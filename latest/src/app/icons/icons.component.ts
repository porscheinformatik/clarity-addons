import { Component } from "@angular/core";
import { EssentialShapes } from "@clr/icons/shapes/essential-shapes";

@Component({
    selector: "icons",
    templateUrl: "icons.component.html"
})
export class IconsComponent {
// TODO replace with Clr Addons Shapes instead
    backgroundIcons: string[] = Object.keys(EssentialShapes);
}
