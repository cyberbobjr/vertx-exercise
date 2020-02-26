import {
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    Input,
    OnInit, Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {applicationsWidgets} from '../../../widgetsList';
import {Widget} from '../../../widgets/Widget';

@Component({
               selector: 'app-widget-container',
               templateUrl: './widget-container.component.html',
               styleUrls: ['./widget-container.component.scss']
           })
export class WidgetContainerComponent implements OnInit {
    @Input() widgetName: string;
    @ViewChild('widgetanchor', {static: true, read: ViewContainerRef}) anchorWidget: ViewContainerRef;

    constructor(private viewContainerRef: ViewContainerRef,
                private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngOnInit(): void {
        this.loadComponent();
    }

    loadComponent() {
        applicationsWidgets.forEach((widget: Type<Widget>) => {
            if (widget.name === this.widgetName) {
                const factory: ComponentFactory<Widget> = this.componentFactoryResolver.resolveComponentFactory(widget);
                this.anchorWidget.createComponent(factory);
            }
        });
    }
}
