import { Component } from '@angular/core';
import { CodeSnippet } from '../../utils/code-snippet';

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
<body cds-theme="phs">
`;

const NG_MODULE_EXAMPLE = `
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";

@NgModule({
    imports: [...],
     declarations: [ AppComponent ],
     bootstrap: [ AppComponent ]
})
export class AppModule { }
`;

@Component({
  selector: 'get-started',
  templateUrl: './get-started.component.html',
  host: {
    '[class.content-area]': 'true',
  },
  imports: [CodeSnippet],
})
export class GetStartedComponent {
  public nodeImports = NODE_IMPORTS;
  public htmlImports = HTML_IMPORTS;
  public phsTheme = PHS_THEME;
  public ngModuleExample = NG_MODULE_EXAMPLE;
}
