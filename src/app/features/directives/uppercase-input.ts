import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercaseInput]'
})
export class UppercaseInput {

  constructor() { }

  private readonly control = inject(NgControl, { optional: true, self: true });

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const inputStart = input.selectionStart;
    const inputEnd = input.selectionEnd;
    
    const upperInputValue = input.value.toUpperCase();
    
    if ( input.value !== upperInputValue ) {
      input.value = upperInputValue;
      input.setSelectionRange(inputStart, inputEnd);

      if (this.control && this.control.control) {
        this.control.control.setValue(upperInputValue, { emitEvent: false });
      }
    }
  }

}
