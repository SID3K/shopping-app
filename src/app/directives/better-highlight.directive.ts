import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  @Input('df') defaultColor:string='transparent';
  @Input() highlightColor:string='blue'; 

  @HostBinding('style.backgroundColor') bgcolor:string=this.defaultColor;

  constructor(private elRef:ElementRef,private renderer:Renderer2) { }

  ngOnInit(){
    // this.renderer.setStyle(this.elRef.nativeElement,'background-color','blue');
    this.bgcolor=this.defaultColor;  //this values gets assigned before page is rendered, 
    //above in host binding also we assigned defaultcolor but our custom property binded color is not assigned there
    // ngOnInit runs once we have all our values so writing inside this works
  }

  @HostListener('mouseenter') mouseovr(eventdata:Event){
    // console.log(eventdata);
    //this.renderer.setStyle(this.elRef.nativeElement,'background-color','blue');
    this.bgcolor=this.highlightColor;
  }

  @HostListener('mouseleave') mouselv(eventdata:Event){
    // console.log(eventdata);
    //this.renderer.setStyle(this.elRef.nativeElement,'background-color','yellow');
    this.bgcolor=this.defaultColor;
  }

  @HostListener('click') mouseclick(eventdata:Event){
    this.renderer.setStyle(this.elRef.nativeElement,'background-color','orange');
  }

}
