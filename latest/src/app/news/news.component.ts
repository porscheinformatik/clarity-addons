import { Component } from "@angular/core";

@Component({
    selector: "news",
    templateUrl: "news.component.html",
    host: {
        "[class.content-container]": "true"
    }
})
export class NewsComponent {
}
