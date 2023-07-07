import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';

@Component({
  selector: 'clr-html-editor-demo',
  templateUrl: './html-editor.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
})
export class HtmlEditorDemo extends ClarityDocComponent {
  value =
    '<div class="container"> <header class="header"> <h1>HELLO</h1> <div class="social"> <a href="#"><i class="fab fa-facebook"></i></a> <a href="#"><i class="fab fa-instagram"></i></a> <a href="#"><i class="fab fa-twitter"></i></a> </div> </header> <aside class="left"> <br> <ul> <li>item1<br></li> <li>item2</li> <li>item3</li> </ul> <p>"Do something important in life. I convert coffee to code."<br>- Mr Coffee</p> </aside> <main class="content"> <h2>About Me</h2> <p>Something interesting<br></p> <h2>My Career</h2> <p>I work as a web developer.<br></p></main></div> ';

  constructor() {
    super('html-editor');
  }
}
