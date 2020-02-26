import {Component, OnInit} from '@angular/core';
import {NameService} from '../../services/name.service';

@Component({
               selector: 'app-root',
               templateUrl: './app.component.html',
               styleUrls: ['./app.component.scss']
           })
export class AppComponent implements OnInit {
    nameValue: string;

    constructor(private nameService: NameService) {
    }

    async ngOnInit() {
        this.nameValue = await this.nameService.getCurrentName().toPromise();
    }

    async save() {
        await this.nameService.saveName(this.nameValue).toPromise();
    }
}
