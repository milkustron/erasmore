import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
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
  
  @Output() checkboxChange = new EventEmitter<boolean>();
  checked: boolean = false;

  constructor() {}

  isDetailsVisible = false;

  showDetails() {
	  this.isDetailsVisible = true;
  }

  hideDetails() {
	  this.isDetailsVisible = false;
  }

  onCheckboxChange() {
    if (this.checked){
      this.checkboxChange.emit(false);
      this.checked = false;
    } else {
      this.checkboxChange.emit(true);
      this.checked = true;
    }
  }
}
