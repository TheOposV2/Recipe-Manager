import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightOnHover]',
  standalone: true
})
export class HighlightOnHoverDirective {
 @Input() hoverColor: string = 'dodgerblue';
constructor(
   private el: ElementRef, 
   private renderer: Renderer2 
   ) {

   }
    @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.hoverColor);
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'background-color 0.3s ease');
    }
    @HostListener('mouseleave') onMouseLeave() {
     this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
     }
  }
  
