import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  selectedStage: number = 1;
  constructor() {}
  onStageClick(stage: number) {
    this.selectedStage = stage;
  }
}
