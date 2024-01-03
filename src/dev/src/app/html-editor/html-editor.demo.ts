/*
 * Copyright (c) 2018-2023 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'clr-html-editor-demo',
  templateUrl: './html-editor.demo.html',
})
export class HtmlEditorDemo {
  config = {
    toolbarHiddenButtons: [['insertImage', 'insertVideo', 'fontName']],
    placeholder: '',
    sanitize: false,
    editable: true,
  } as AngularEditorConfig;

  htmlContent =
    '<div class="container"> <header class="header"> <h1>HELLO</h1> <div class="social"> <a href="#"><i class="fab fa-facebook"></i></a> <a href="#"><i class="fab fa-instagram"></i></a> <a href="#"><i class="fab fa-twitter"></i></a> </div> </header> <aside class="left"> <br> <ul> <li>item1<br></li> <li>item2</li> <li>item3</li> </ul> <p>"Do something important in life. I convert coffee to code."<br>- Mr Coffee</p> </aside> <main class="content"> <h2>About Me</h2> <p>Something interesting<br></p> <h2>My Career</h2> <p>I work as a web developer.<br></p></main></div> ';

  output = this.htmlContent;
  onChange(event: string) {
    this.output = event;
  }
}
