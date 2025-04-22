import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { IonicModule } from '@ionic/angular';
import { ChecklistItem } from './checklist-item';
import { DetailsComponent } from './details/details.component'; //PopUp unused for now
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checklist',
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent {
  @Input() stage: number = 0;
  @Input() checklistItem!: ChecklistItem;
  
  @Output() checkboxChange = new EventEmitter<{ id: number, checked: boolean }>();

  @Input() checked: boolean = false;

  constructor() {}

  isDetailsVisible = false;

  showDetails() {
	  this.isDetailsVisible = true;
  }

  hideDetails() {
	  this.isDetailsVisible = false;
  }

  onCheckboxChange() {
    this.checked = !this.checked;
    this.checklistItem.checked = this.checked; // update item state
    this.checkboxChange.emit({ id: this.checklistItem.id, checked: this.checked });
  }

  checkLink(): boolean{
    if(this.checklistItem.link){
      return true;
    } else {
      return false;
    }
  }

  open(){
    window.open(this.checklistItem.link, '_blank');
  }
}
