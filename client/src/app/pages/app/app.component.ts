import {Component, OnInit} from '@angular/core';
import {NameService} from '../../services/name.service';

@Component({
               selector: 'app-root',
               templateUrl: './app.component.html',
               styleUrls: ['./app.component.scss']
           })
export class AppComponent implements OnInit {
    name: string;

    constructor(private nameService: NameService) {
    }

    async ngOnInit() {
        this.name = await this.nameService.getCurrentName().toPromise();
    }
}
