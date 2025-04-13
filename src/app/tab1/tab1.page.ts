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

  jsConfetti!: JSConfetti;

  ngAfterViewInit() {
    this.jsConfetti = new JSConfetti();
  }

  constructor(private stageNameService: StageNameService) {}

  onStageClick(stage: number) {
    this.selectedStage = stage;
    this.isCollapsed = true;
    const stageName = this.stageNameService.getStageName(this.selectedStage);
    this.checklistService.getChecklistByStage(stageName).then((checklist: ChecklistItem[]) => {
    this.checklist = checklist;
    this.checkboxCounter = 0;
  });
  }

  getStageName(stage: number): string {
    return this.stageNameService.getStageName(stage);
  }

  onCheckboxChange(checked: any) {
    if (checked){
      this.checkboxCounter += 1;
    } else {
      this.checkboxCounter -= 1;
    }
    
    if(this.checkboxCounter === this.checklist.length){
      this.activateConfetti = true;
      this.jsConfetti.addConfetti();
      this.completedStages.push(this.selectedStage)
    }
    console.log((this.selectedStage in this.completedStages))
  }

  isStageCompleted(stage:number): boolean{
    if (this.completedStages.includes(stage)) {
      return true;
    } else {
      return false;
    }
  }
}
