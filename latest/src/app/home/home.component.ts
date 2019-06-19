import { Component } from "@angular/core";

@Component({
  selector: "home",
  templateUrl: "home.component.html",
  styleUrls: ["./home.component.scss"],
  host: {
    "[class.content-container]": "true"
  }
})
export class HomeComponent {

  constructor() { }

}
