import {Component, OnInit} from '@angular/core';
import {Widget} from '../Widget';
import {PhotoService} from './photo.service';

@Component({
               selector: 'app-photo',
               templateUrl: './photo.component.html',
               styleUrls: ['./photo.component.scss']
           })
export class PhotoComponent extends Widget implements OnInit {
    static widgetName: string = 'photo';

    constructor(private photoService: PhotoService) {
        super();
    }

    ngOnInit(): void {
    }

}
