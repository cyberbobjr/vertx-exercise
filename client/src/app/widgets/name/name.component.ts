import {Component, OnInit} from '@angular/core';
import {NameService} from './name.service';
import {Widget} from '../Widget';

@Component({
               selector: 'app-name',
               templateUrl: './name.component.html',
               styleUrls: ['./name.component.scss']
           })
export class NameComponent extends Widget implements OnInit {
    nameValue: string;
    static widgetName: string = 'photo';

    constructor(private nameService: NameService) {
        super();
    }

    async ngOnInit() {
        this.nameValue = await this.nameService.getCurrentName().toPromise();
    }

    async save() {
        await this.nameService.saveName(this.nameValue).toPromise();
    }
}
