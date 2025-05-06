import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgressionPage } from './progression.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ChecklistitemComponent } from './checklist/checklistitem.component';

import { ProgessionPageRoutingModule } from './progression-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ProgessionPageRoutingModule,
    ChecklistitemComponent
  ],
  declarations: [ProgressionPage]
})
export class ProgressionPageModule {}
