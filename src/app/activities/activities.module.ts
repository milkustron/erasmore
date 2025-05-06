import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivitiesPage } from './activities.page';

import { activitiesPageRoutingModule } from './activities-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    activitiesPageRoutingModule
  ],
  declarations: [ActivitiesPage]
})
export class ActivitiesPageModule {}
