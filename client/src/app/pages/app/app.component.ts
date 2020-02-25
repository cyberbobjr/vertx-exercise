import {Component, OnDestroy, OnInit} from '@angular/core';
import {NameService} from '../../services/name.service';
import {AppsService} from '../../services/apps.service';
import {Subscription} from 'rxjs';

@Component({
               selector: 'app-root',
               templateUrl: './app.component.html',
               styleUrls: ['./app.component.scss']
           })
export class AppComponent implements OnInit, OnDestroy {
    subscription: Subscription = new Subscription();
    logs: string[] = [];
    nameValue: string;

    constructor(private nameService: NameService,
                private appsService: AppsService) {
    }

    async ngOnInit() {
        this.nameValue = await this.nameService.getCurrentName().toPromise();
        this.loadActivityListener();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    loadActivityListener() {
        this.subscription.add(
            this.appsService.activityLogs$.subscribe(message => {
                this.logs.push(message);
            })
        );
    }

    async save() {
        await this.nameService.saveName(this.nameValue).toPromise();
    }
}
