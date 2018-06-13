### Installing Clarity Addons

1.  Install Clarity Addons package through npm:

    ```
    npm install @porscheinformatik/clr-addons
    ```

2.  Import the ClrAddonsModule into your Angular application's module. Your application's main module might look like this:

    ```typescript
    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { ClrAddonsModule } from '@porscheinformatik/clr-addons';
    import { AppComponent } from './app.component';

    @NgModule({
        imports: [
            BrowserModule,
            ClrAddonsModule,
            ....
         ],
         declarations: [ AppComponent ],
         bootstrap: [ AppComponent ]
    })
    export class AppModule {    }
    ```

## Documentation

For documentation on the Clarity Addons, including a list of components and example usage, see [our website](https://porscheinformatik.github.io/clarity-addons/).
