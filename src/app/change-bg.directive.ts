import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {

  @Input() isCorrect: Boolean = false;
  constructor(private el: ElementRef, private render: Renderer2) { }
  //For listening the click event use HostListener
  @HostListener('click') answer(){
    if(this.isCorrect){
      //for the background
      this.render.setStyle(this.el.nativeElement, 'background','green');
      //For the Text color
      this.render.setStyle(this.el.nativeElement, 'color','#fff');
      //For the boarders
      this.render.setStyle(this.el.nativeElement, 'boarder','2px solid grey');
    }else{
     //for the background
     this.render.setStyle(this.el.nativeElement, 'background','red');
     //For the Text color
     this.render.setStyle(this.el.nativeElement, 'color','#fff');
     //For the boarders
     this.render.setStyle(this.el.nativeElement, 'boarder','2px solid grey');
    }
  }
}
