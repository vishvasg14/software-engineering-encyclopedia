import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  private el = inject(ElementRef<HTMLElement>);
  color = input('yellow');

  constructor() {
    this.applyColor();
  }

  ngOnChanges() {
    this.applyColor();
  }

  private applyColor() {
    this.el.nativeElement.style.backgroundColor = this.color();
  }
}