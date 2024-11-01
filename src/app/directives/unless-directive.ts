import { Directive, TemplateRef, Input, OnInit, ViewContainerRef, OnChanges } from "@angular/core";

@Directive({
    selector:"[appUnless]"
})

export class UnlessDirective implements OnInit, OnChanges{

    @Input('appUnless') ap:boolean;
    ngOnInit() {}

    ngOnChanges(){
        if(!this.ap){
            this.vcRef.createEmbeddedView(this.templateRef);
        } else{
           this.vcRef.clear(); 
        }
    }

    constructor(private templateRef:TemplateRef<any>,private vcRef:ViewContainerRef){}
}
