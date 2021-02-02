import {Component} from "@angular/core";

const NODE_IMPORTS = `
"styles": [
      ... clarity styles
      "node_modules/@porscheinformatik/clr-addons/styles/clr-addons-phs.min.css",
      ... any other styles
]
`;

const HTML_IMPORTS = `
<link rel="stylesheet" href="path/to/node_modules/@porscheinformatik/clr-addons/styles/clr-addons-phs.min.css">
`;

const PHS_THEME = `
<html cds-theme="phs">
`;

const NG_MODULE_EXAMPLE = `
import { NgModule } from "@angular/core";
import { ClrAddonsModule } from '@porscheinformatik/clr-addons';
import { AppComponent } from "./app.component";

@NgModule({
    imports: [
        ClrAddonsModule,
        ...
     ],
     declarations: [ AppComponent ],
     bootstrap: [ AppComponent ]
})
export class AppModule { }
`;

@Component({
    selector: "get-started",
    templateUrl: "./get-started.component.html",
    host: {
        "[class.content-area]": "true"
    }
})
export class GetStartedComponent {
    public nodeImports = NODE_IMPORTS;
    public htmlImports = HTML_IMPORTS;
    public phsTheme = PHS_THEME;
    public ngModuleExample = NG_MODULE_EXAMPLE;
}
