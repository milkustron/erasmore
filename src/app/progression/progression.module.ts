import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgressionPage } from './progression.page';
import { ChecklistitemComponent } from './checklist/checklistitem.component';

import { ProgessionPageRoutingModule } from './progression-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProgessionPageRoutingModule,
    ChecklistitemComponent
  ],
  declarations: [ProgressionPage]
})
export class ProgressionPageModule {}
