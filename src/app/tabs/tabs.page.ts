import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { navigationControl } from './navigation-control';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {

  @ViewChildren('tabBtn', { read: ElementRef })
  tabButtons!: QueryList<ElementRef<HTMLElement>>;

  // start with the first tab in the tabindex
  tabFocusIndex = 0;

  ngAfterViewInit() {
    // initialize tabindex on each tab-button
    this.repaintTabIndexes();
  }

  private repaintTabIndexes() {
    this.tabButtons.toArray().forEach((btn, i) => {
      btn.nativeElement.setAttribute(
        'tabindex',
        this.tabFocusIndex === i ? '0' : '-1'
      );
    });
  }

  onTabKeydown(event: KeyboardEvent, idx: number) {
    const btns = this.tabButtons.toArray();
  
    // ───── NEW: if Up on the "Progress" tab, dive into the last checklist item ─────
    // assume your "progression" tab is index 0
    if (event.key === 'ArrowUp' && idx === 0) {
      const rows = Array.from(
        document.querySelectorAll<HTMLElement>('.checklist-row')
      );
      if (rows.length) {
        event.preventDefault();
        rows[rows.length - 1].focus();
        return;
      }
    }
  
    let newIndex = navigationControl(event,idx, btns);
    if (newIndex === -1) return;
  
    event.preventDefault();
    btns[idx].nativeElement.setAttribute('tabindex', '-1');
    btns[newIndex].nativeElement.setAttribute('tabindex', '0');
    btns[newIndex].nativeElement.focus();
    this.tabFocusIndex = newIndex;
  }

}
