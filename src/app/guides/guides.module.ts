import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GuidesPage } from './guides.page';

import { GuidesPageRoutingModule } from './guides-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    GuidesPageRoutingModule
  ],
  declarations: [GuidesPage]
})
export class GuidesPageModule {}
