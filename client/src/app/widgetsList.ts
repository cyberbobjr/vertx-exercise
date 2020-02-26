import {Type} from '@angular/core';
import {NameComponent} from './widgets/name/name.component';
import {PhotoComponent} from './widgets/photo/photo.component';
import {Widget} from './widgets/Widget';

export const applicationsWidgets: Array<Type<Widget>> = [NameComponent, PhotoComponent];
