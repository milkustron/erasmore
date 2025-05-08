import { Component, ElementRef, HostListener, inject, QueryList, ViewChildren } from '@angular/core';
import { StageNameService } from '../services/stage-name.service';
import { ChecklistItem } from './checklist/checklist-item';
import { ChecklistService } from '../services/checklist.service';

import JSConfetti from 'js-confetti';
import { navigationControl } from '../tabs/navigation-control';

@Component({
  selector: 'app-progression',
  templateUrl: 'progression.page.html',
  styleUrls: ['progression.page.scss'],
  standalone: false,
})
export class ProgressionPage {
  selectedStage: number = -1;
  isCollapsed: boolean = false;
  checklist: ChecklistItem[] = [];
  checklistService = inject(ChecklistService);
  checkboxCounter: number = 0;

  completedStages :number[] = [];
  activateConfetti: boolean = false;

  checkedItemsPerStage: { [stage: number]: number[] } = {};

  jsConfetti!: JSConfetti;

  ngAfterViewInit() {
    this.jsConfetti = new JSConfetti();

    this.repaintTabindexes(this.focusIndex);
  }

  setFocusIndex(idx: number) {
    this.focusIndex = idx;
  }

  constructor(private stageNameService: StageNameService) {}

  onStageClick(stage: number) {
    this.selectedStage = stage;
    this.isCollapsed = true;
    const stageName = this.stageNameService.getStageName(this.selectedStage);
  
    // Get checklist for this stage
    const checklist = this.checklistService.getChecklistByStage(stageName);
  
    // Ensure we have an array for this stage
    if (!this.checkedItemsPerStage[stage]) {
      this.checkedItemsPerStage[stage] = [];
    }
  
    const checkedIds = this.checkedItemsPerStage[stage];
  
    // Restore the checkbox state from saved ids
    checklist.forEach(item => {
      item.checked = checkedIds.includes(item.id);
    });
  
    this.checklist = checklist;
  
    // Update counter with how many were checked
    this.checkboxCounter = this.checklist.filter(item => item.checked).length;
  }

  getStageName(stage: number): string {
    return this.stageNameService.getStageName(stage);
  }

  onCheckboxChange(event: { id: number, checked: boolean }) {
    // if (event.checked){
    //   this.checkboxCounter += 1;
    // } else {
    //   this.checkboxCounter -= 1;
    // }

    // if (event.checked) {
    //   if (!this.checkedItemIds.includes(event.id)) {
    //     this.checkedItemIds.push(event.id);
    //   }
    // } else {
    //   this.checkedItemIds = this.checkedItemIds.filter(itemId => itemId !== event.id);
    // }

    if (!this.checkedItemsPerStage[this.selectedStage]) {
      this.checkedItemsPerStage[this.selectedStage] = [];
    }
    const currentChecked = this.checkedItemsPerStage[this.selectedStage];

    if (event.checked) {
      if (!currentChecked.includes(event.id)) {
        currentChecked.push(event.id);
      }
    } else {
      this.checkedItemsPerStage[this.selectedStage] = currentChecked.filter(itemId => itemId !== event.id);
    }

     // Update counter
     const allChecked = this.checklist.every(item =>
      this.checkedItemsPerStage[this.selectedStage].includes(item.id)
    );
    
    this.checkboxCounter = this.checklist.filter(item =>
      this.checkedItemsPerStage[this.selectedStage].includes(item.id)
    ).length;
    
    if (allChecked) {
      if (!this.activateConfetti) {
        this.activateConfetti = true;
        this.jsConfetti.addConfetti();
      }
      if (!this.completedStages.includes(this.selectedStage)) {
        this.completedStages.push(this.selectedStage);
      }
    } else {
      this.activateConfetti = false;
      this.completedStages = this.completedStages.filter(stage => stage !== this.selectedStage);
    }
  }

  isStageCompleted(stage:number): boolean{
    if (this.completedStages.includes(stage)) {
      return true;
    } else {
      return false;
    }
  }

  isChecked(id: number): boolean {
    return this.checkedItemsPerStage[this.selectedStage]?.includes(id) ?? false;
  }

  @ViewChildren('stageBtn', { read: ElementRef })
  stageButtons!: QueryList<ElementRef<HTMLElement>>;

  focusIndex = 0;     

onKeydown(event: KeyboardEvent, idx: number) {
    const btns = this.stageButtons.toArray();

    if (event.key === 'ArrowDown' && this.isCollapsed) {
      event.preventDefault();
      const firstRow = document.querySelector<HTMLElement>('.checklist-row');
      if (firstRow) {
        firstRow.focus();
      }
      return;
    }

    if (!btns.length) return;

    let newIndex = navigationControl(event,idx, btns);
    if (newIndex === -1) return;

    event.preventDefault();
    // repaint tabindex
    btns[idx].nativeElement.setAttribute('tabindex', '-1');
    btns[newIndex].nativeElement.setAttribute('tabindex', '0');
    btns[newIndex].nativeElement.focus();
    this.focusIndex = newIndex;
  }

  focusStageNav() {
    // compute which button is “active” (0-based)
    const idx = this.selectedStage - 1;
    this.focusIndex = idx;
    this.repaintTabindexes(idx);
    // finally focus it
    this.stageButtons.toArray()[idx].nativeElement.focus();
  }

  focusTabsNav() {
    // find the <ion-tab-bar> element
    const tabBarEl = document.querySelector('ion-tab-bar') as HTMLElement & { shadowRoot?: ShadowRoot };
    if (!tabBarEl) {
      console.warn('No <ion-tab-bar> found');
      return;
    }
  
    // first try to pierce into its shadowRoot
    const hostBtn = tabBarEl.shadowRoot
      // look for the tab-button with your current route's tab attribute
      ?.querySelector<HTMLElement>('ion-tab-button[tab="progression"]')
      // fallback to light-DOM if it wasn't in the shadow
      ?? document.querySelector<HTMLElement>('ion-tab-button[tab="progression"]');
  
    if (!hostBtn) {
      console.warn('No ion-tab-button[tab="progression"] found');
      return;
    }
  
    // ensure it can receive focus
    hostBtn.setAttribute('tabindex', '0');
    hostBtn.focus();
  }


  private repaintTabindexes(activeIndex: number) {
    this.stageButtons
      .toArray()
      .forEach((b, i) =>
        b.nativeElement.setAttribute('tabindex', i === activeIndex ? '0' : '-1')
      );
  }

}
