import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';
import { ChecklistItem } from './checklist-item';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checklistitem',
  templateUrl: './checklistitem.component.html',
  imports: [IonicModule, CommonModule],
  styleUrls: ['./checklistitem.component.scss']
})
export class ChecklistitemComponent
 {
  @Input() checklistItem!: ChecklistItem;
  @Input() checked = false;
  @Output() checkboxChange = new EventEmitter<{ id: number; checked: boolean }>();

  /**
   * 1) Anywhere you hit ↓/↑ with no row focused, jump into the list
   */
  @Output() navigateUpToStages = new EventEmitter<void>();
  @Output() navigateDownToTabs = new EventEmitter<void>();

  handleInitialArrow(event: KeyboardEvent) {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;

    const active = document.activeElement as HTMLElement;
    const insideList =
      active?.classList.contains('checklist-row') ||
      active?.classList.contains('learn-more-btn');

    if (!insideList) {
      event.preventDefault(); // stop page scrolling
      const rows = Array.from(
        document.querySelectorAll<HTMLElement>('.checklist-row')
      );
      if (!rows.length) return;
      // ↓ → first, ↑ → last
      const target = event.key === 'ArrowDown' ? rows[0] : rows[rows.length - 1];
      target.focus();
    }
  }

  onItemClick(event: MouseEvent | KeyboardEvent) {
    // if Learn More was the click source, bail out
    if ((event.target as HTMLElement).closest('ion-button')) return;
    this.checkboxChange.emit({
      id: this.checklistItem.id,
      checked: !this.checked
    });
  }

  onCheckboxChange(event: any) {
    this.checkboxChange.emit({
      id: this.checklistItem.id,
      checked: event.detail.checked
    });
  }

  checkLink(): boolean {
    return !!this.checklistItem.link;
  }

  open(event: MouseEvent | KeyboardEvent) {
    event.stopPropagation();
    window.open(this.checklistItem.link, '_blank');
  }

  /**
   * 2) When a row <div> is focused: ↑/↓ to move or leave list, Enter/Space to toggle
   */
  onRowKeydown(event: KeyboardEvent) {
    const row = event.currentTarget as HTMLElement;
    const rows = Array.from(document.querySelectorAll<HTMLElement>('.checklist-row'));
    const idx  = rows.indexOf(row);
    const learnBtn = row.querySelector<HTMLElement>('.learn-more-btn');

    switch (event.key) {
      case 'ArrowRight':
        // if this row has a Learn More button, focus it
        if (learnBtn) {
          event.preventDefault();
          learnBtn.focus();
        }
        break;
      
      case 'ArrowLeft':
      // if this row has a Learn More button, focus it
      if (learnBtn) {
        event.preventDefault();
        rows[idx].focus();
      }
      break;

      case 'ArrowDown':
        event.preventDefault();
        if (idx < rows.length - 1) {
          rows[idx + 1].focus();
        } else {
          this.navigateDownToTabs.emit();
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (idx > 0) {
          rows[idx - 1].focus();
        } else {
          this.navigateUpToStages.emit();
        }
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        this.onItemClick(event);
        break;
    }
  }

  /**
   * 3) When “Learn More” is focused: ↑/↓ to leave list or move, Enter/Space to open
   */
  onLearnMoreKeydown(event: KeyboardEvent) {
    const btn = event.currentTarget as HTMLElement;
    const row = btn.closest('.checklist-row') as HTMLElement;
    if (!row) return;

    const rows = Array.from(
      document.querySelectorAll<HTMLElement>('.checklist-row')
    );
    const idx = rows.indexOf(row);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (idx < rows.length - 1) {
        rows[idx + 1].focus();
      } else {
        this.focusActiveStageButton();
      }

    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (idx > 0) {
        rows[idx - 1].focus();
      } else {
        this.focusActiveStageButton();
      }

    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.open(event);
    }
  }

  /**
   * Utility: focus the currently-selected stage button
   */
  private focusActiveStageButton() {
    const btn = document.querySelector<HTMLElement>('.stage-button.active');
    if (btn) {
      btn.focus();
    }
  }
}
