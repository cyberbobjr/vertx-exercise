import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Widget} from '../Widget';
import {PhotoService} from './photo.service';
import {FileInput} from 'ngx-material-file-input';
import {configuration} from '../../../../../configuration';

@Component({
               selector: 'app-photo',
               templateUrl: './photo.component.html',
               styleUrls: ['./photo.component.scss']
           })
export class PhotoComponent extends Widget implements OnInit {
    static widgetName: string = 'photo';
    basicfile: FileInput;
    baseUrl: string = configuration.baseUrl;
    isExisting: boolean = false;

    constructor(private photoService: PhotoService,
                private cd: ChangeDetectorRef) {
        super();
    }

    async ngOnInit() {
        this.isExisting = await this.photoService.isExisting().toPromise();
    }

    async save() {
        this.isExisting = false;
        const formData: FormData = new FormData();
        formData.append('file', this.basicfile.files[0]);
        await this.photoService.savePhoto(formData).toPromise();
        this.isExisting = true;
        alert('Photo envoyée');
    }
}
