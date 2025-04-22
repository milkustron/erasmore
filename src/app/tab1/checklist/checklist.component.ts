import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChecklistItem } from './checklist-item';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  imports: [IonicModule, CommonModule],
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent {
  @Input() checklistItem!: ChecklistItem;
  @Input() checked = false;

  @Output() checkboxChange = new EventEmitter<{ id: number, checked: boolean }>();

  onItemClick(event: MouseEvent) {
    // Don’t toggle when Learn More was clicked
    if ((event.target as HTMLElement).closest('ion-button')) return;

    this.checkboxChange.emit({ id: this.checklistItem.id, checked: !this.checked });
  }

  onCheckboxChange(event: any) {
    const isChecked = event.detail.checked;
    this.checkboxChange.emit({ id: this.checklistItem.id, checked: isChecked });
  }

  checkLink(): boolean {
    return !!this.checklistItem.link;
  }

  open(event: MouseEvent) {
    event.stopPropagation();
    window.open(this.checklistItem.link, '_blank');
  }
}
