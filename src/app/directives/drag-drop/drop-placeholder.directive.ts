import { Directive, ElementRef, OnInit, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appDropPlaceholder]',
})
export class DropPlaceholderDirective implements OnInit {
  constructor(public elementRef: ElementRef<HTMLElement>) {}

  ngOnInit() {
    // placeholder has to be "invisible" to the cursor,
    // or it would interfere with the dragover detection for the same drop zone
    this.elementRef.nativeElement.style.pointerEvents = 'none';
  }
}
