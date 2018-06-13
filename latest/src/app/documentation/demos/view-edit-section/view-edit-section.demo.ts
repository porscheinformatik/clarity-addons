/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {Component} from "@angular/core";
import {ClarityDocComponent} from "../clarity-doc";

const HTML_EXAMPLE = `
<div class="col-xs-12 col-lg-6">
    <clr-view-edit-section [clrTitle]="sectionTitle" (clrSectionSubmitted)="sectionSubmitted()" (clrSectionEditCancelled)="sectionCancelled()">
        <div view-block>
            <div class="form-group">
                <label for="bp_id">Businesspartner-ID</label>
                <span class="text-truncate">{{bpid || "&nbsp;"}}</span>
            </div>
            <div class="form-group">
                <label for="guid">GUID</label>
                <span class="text-truncate">{{guid || "&nbsp;"}}</span>
            </div>
            <div class="form-group">
                <label for="nn">Lastname</label>
                <span class="text-truncate">{{nn || "&nbsp;"}}</span>
            </div>
        </div>
        <div edit-block>
            <div class="form-group">
                <label for="bp_id">Businesspartner-ID</label>
                <input id="bp_id" type="text" [(ngModel)]="editBpid" name="id">
            </div>
            <div class="form-group">
                <label for="guid">GUID</label>
                <input id="guid" type="text" [(ngModel)]="editGuid" name="guid">
            </div>
            <div class="form-group">
                <label for="nn">Lastname</label>
                <input id="nn" type="text" [(ngModel)]="editNn" name="nn">
            </div>
        </div>
    </clr-view-edit-section>
</div>
`

@Component({
    selector: "clr-view-edit-section-demo",
    templateUrl: "./view-edit-section.demo.html",
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class ViewEditSectionDemo extends ClarityDocComponent{
    htmlExample = HTML_EXAMPLE;

    first: string;
    last: string;
    email: string;
    editFirst: string;
    editLast: string;
    editEmail: string;

    hobby: string;
    licence: string;
    editHobby: string;
    editLicence: string;

    sectionTitle: string = "Personal Data";
    addSectionTitle: string = "Additional Data";

    constructor() {
        super("view-edit-section");
    }

    sectionSubmitted() {
        this.first = this.editFirst;
        this.last = this.editLast;
        this.email = this.editEmail;
    }

    sectionCancelled() {
        this.editFirst = this.first;
        this.editLast = this.last;
        this.editEmail = this.email;
    }

    addSectionSubmitted() {
        this.hobby = this.editHobby;
        this.licence = this.editLicence;
    }

    addSectionCancelled() {
        this.editHobby = this.hobby;
        this.editLicence = this.licence;
    }
}
