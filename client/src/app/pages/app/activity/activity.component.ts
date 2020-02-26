import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AppsService} from '../../../services/apps.service';
import {ActivityService} from '../../../services/activity.service';

@Component({
               selector: 'app-activity',
               templateUrl: './activity.component.html',
               styleUrls: ['./activity.component.scss']
           })
export class ActivityComponent implements OnInit, OnDestroy {
    logs: string[] = [];
    subscription: Subscription = new Subscription();
    panelOpenState: boolean = false;
    unreadCount: number = 0;

    constructor(private appsService: AppsService,
                private activityService: ActivityService) {
    }

    toggle() {
        this.panelOpenState = !this.panelOpenState;
        if (this.panelOpenState) {
            this.unreadCount = 0;
        }
    }

    async ngOnInit() {
        this.logs = await this.activityService.getLogs().toPromise();
        this.unreadCount = this.logs.length;
        this.loadActivityListener();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    loadActivityListener() {
        this.subscription.add(
            this.appsService.activityLogs$.subscribe(message => {
                this.logs.push(message);
                if (!this.panelOpenState) {
                    this.unreadCount++;
                }
            })
        );
    }
}
