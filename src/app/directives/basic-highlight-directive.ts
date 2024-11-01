import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector:"[appHighlight]"
})
export class BaiscHighlightDirective implements OnInit{
    constructor(private element:ElementRef){}
    ngOnInit(){
        this.element.nativeElement.style.backgroundColor='red';
    }
}