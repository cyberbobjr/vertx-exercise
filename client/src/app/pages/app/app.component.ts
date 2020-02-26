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
        this.allApps = await this.appsService.loadApps().toPromise();
        await this.loadActivatedApps();
    }

    async toggleStart(w: string) {
        await this.appsService.startWidget(w).toPromise();
        await this.loadActivatedApps();
    }

    async toggleStop(w: string) {
        await this.appsService.stopWidget(w).toPromise();
        await this.loadActivatedApps();
    }

    async loadActivatedApps() {
        this.activeApps = await this.appsService.loadActiveApps().toPromise();
    }
}
