// highlight.directive.ts
import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
  @Input() appHighlightColor: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.highlight(this.appHighlightColor || 'yellow'); 
  }

  private highlight(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }
}
