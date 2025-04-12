import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { IonicModule } from '@ionic/angular';
import { ChecklistItem } from './checklist-item';
import { DetailsComponent } from './details/details.component';

@Component({
  selector: 'app-checklist',
  imports: [IonicModule, DetailsComponent, CommonModule],
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent {
  @Input() stage: number = 0;
  @Input() checklistItem!: ChecklistItem;
  
  constructor() {}

  isDetailsVisible = false;

  showDetails() {
	  this.isDetailsVisible = true;
  }

  hideDetails() {
	  this.isDetailsVisible = false;
  }
}
