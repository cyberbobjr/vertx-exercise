import {Component, OnInit} from '@angular/core';
import {AppsService} from '../../services/apps.service';

@Component({
               selector: 'app-root',
               templateUrl: './app.component.html',
               styleUrls: ['./app.component.scss']
           })
export class AppComponent implements OnInit {
    activeApps: string[] = ['NameComponent', 'PhotoComponent'];
    allApps: string[];

    constructor(private appsService: AppsService) {
    }

    async ngOnInit() {
        this.activeApps = await this.appsService.loadActiveApps().toPromise();
        this.allApps = await this.appsService.loadApps().toPromise();
    }

    toggleName() {

    }

    togglePhoto() {

    }
}
