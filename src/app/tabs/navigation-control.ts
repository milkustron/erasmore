import { ElementRef } from "@angular/core";

export function navigationControl(event: KeyboardEvent, idx: number, btns:ElementRef<HTMLElement>[]): number{
    let newIndex: number;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        newIndex = idx + 1 < btns.length ? idx + 1 : 0;
        return newIndex;
      case 'ArrowLeft':
      case 'ArrowUp':
        newIndex = idx - 1 >= 0 ? idx - 1 : btns.length - 1;
        return newIndex;
      case 'Enter':
      case ' ':
        event.preventDefault();
        btns[idx].nativeElement.click();
        return -1;
      default:
        return -1;
    }
}