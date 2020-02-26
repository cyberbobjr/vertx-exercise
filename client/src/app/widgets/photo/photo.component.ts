import {Component, OnInit} from '@angular/core';
import {Widget} from '../Widget';
import {PhotoService} from './photo.service';
import {FileInput} from 'ngx-material-file-input';

@Component({
               selector: 'app-photo',
               templateUrl: './photo.component.html',
               styleUrls: ['./photo.component.scss']
           })
export class PhotoComponent extends Widget implements OnInit {
    static widgetName: string = 'photo';
    basicfile: FileInput;

    constructor(private photoService: PhotoService) {
        super();
    }

    ngOnInit(): void {
    }

    async save() {
        const formData: FormData = new FormData();
        formData.append('file', this.basicfile.files[0]);
        await this.photoService.savePhoto(formData).toPromise();
        alert('Photo envoyée');
    }
}
