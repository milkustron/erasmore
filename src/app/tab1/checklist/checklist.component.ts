import { Component, inject, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StageNameService } from '../../services/stage-name.service';
import { ChecklistService } from 'src/app/services/checklist.service';
import { ChecklistItem } from './checklist-item';

@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent {
  @Input() stage: number = 0;

  @Input() checklistItem!: ChecklistItem;
  

  constructor() {
    
  }

  // get stageName(): string {
  //   return this.stageNameService.getStageName(this.stage);
  // }
}
