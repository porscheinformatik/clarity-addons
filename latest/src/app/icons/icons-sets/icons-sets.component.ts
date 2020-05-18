import { Component } from "@angular/core";

@Component({
    selector: "icons-sets",
    templateUrl: "./icons-sets.component.html"
})
export class IconsSetsComponent {
    // A list of all shapes we want to display
    // TODO replace with list of ClrAddon Icons once it is exported correctly
    shapes: string[] = [
        'new-car-commercial',
        'new-car-private',
        'used-car-commercial',
        'used-car-private'
    ];
}
