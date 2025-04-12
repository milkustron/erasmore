import { Component, inject } from '@angular/core';
import { StageNameService } from '../services/stage-name.service';
import { ChecklistItem } from './checklist/checklist-item';
import { ChecklistService } from '../services/checklist.service';

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


  constructor(private stageNameService: StageNameService) {}

  onStageClick(stage: number) {
    this.selectedStage = stage;
    this.isCollapsed = true;
    const stageName = this.stageNameService.getStageName(this.selectedStage);
    this.checklistService.getChecklistByStage(stageName).then((checklist: ChecklistItem[]) => {
    this.checklist = checklist;
  });
  }

  getStageName(stage: number): string {
    return this.stageNameService.getStageName(stage);
  }
}
