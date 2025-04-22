import { Component, inject } from '@angular/core';
import { StageNameService } from '../services/stage-name.service';
import { ChecklistItem } from './checklist/checklist-item';
import { ChecklistService } from '../services/checklist.service';

import JSConfetti from 'js-confetti';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  selectedStage: number = -1;
  isCollapsed: boolean = false;
  checklist: ChecklistItem[] = [];
  checklistService = inject(ChecklistService);
  checkboxCounter: number = 0;

  completedStages :number[] = [];
  activateConfetti: boolean = false;

  checkedItemIds: number[] = [];

  jsConfetti!: JSConfetti;

  ngAfterViewInit() {
    this.jsConfetti = new JSConfetti();
  }

  constructor(private stageNameService: StageNameService) {}

  onStageClick(stage: number) {
    this.selectedStage = stage;
    this.isCollapsed = true;
    const stageName = this.stageNameService.getStageName(this.selectedStage);
    
  // when using json server
    //   this.checklistService.getChecklistByStage(stageName).then((checklist: ChecklistItem[]) => {
  //   this.checklist = checklist;
  //   this.checkboxCounter = 0;
  // });
    const checklist = this.checklistService.getChecklistByStage(stageName);
    this.checklist = checklist;
    this.checkboxCounter = 0;

    
    
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

    if (event.checked) {
      if (!this.checkedItemIds.includes(event.id)) {
        this.checkedItemIds.push(event.id);
      }
    } else {
      this.checkedItemIds = this.checkedItemIds.filter(itemId => itemId !== event.id);
    }
    
    // if(this.checkboxCounter === this.checklist.length){
    //   this.activateConfetti = true;
    //   this.jsConfetti.addConfetti();
    //   this.completedStages.push(this.selectedStage)
    //   console.log("yes")
    // }

    // Update counter
    this.checkboxCounter = this.checklist.filter(item => this.checkedItemIds.includes(item.id)).length;

    // Confetti logic
    if (this.checkboxCounter === this.checklist.length) {
      this.activateConfetti = true;
      this.jsConfetti.addConfetti();
      this.completedStages.push(this.selectedStage);
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
    return this.checkedItemIds.includes(id);
  }
}
