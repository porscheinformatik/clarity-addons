import { Component } from "@angular/core";
import { ClrAddonsIconShapes } from "@porscheinformatik/clr-addons";

@Component({
    selector: "icons",
    templateUrl: "icons.component.html"
})
export class IconsComponent {
    backgroundIcons: string[] = Object.keys(ClrAddonsIconShapes);
}
