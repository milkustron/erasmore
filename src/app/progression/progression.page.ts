import { Component, inject } from '@angular/core';
import { StageNameService } from '../services/stage-name.service';
import { ChecklistItem } from './checklist/checklist-item';
import { ChecklistService } from '../services/checklist.service';

import JSConfetti from 'js-confetti';

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
    
    // if(this.checkboxCounter === this.checklist.length){
    //   this.activateConfetti = true;
    //   this.jsConfetti.addConfetti();
    //   this.completedStages.push(this.selectedStage)
    //   console.log("yes")
    // }

    // // Update counter
    // this.checkboxCounter = this.checklist.filter(item => this.checkedItemIds.includes(item.id)).length;

    // // Confetti logic
    // if (this.checkboxCounter === this.checklist.length) {
    //   this.activateConfetti = true;
    //   this.jsConfetti.addConfetti();
    //   this.completedStages.push(this.selectedStage);
    // } else {
    //   this.activateConfetti = false;
    //   this.completedStages = this.completedStages.filter(stage => stage !== this.selectedStage);
    // }

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
}
