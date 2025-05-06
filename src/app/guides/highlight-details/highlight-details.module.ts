import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HighlightDetailsPageRoutingModule } from './highlight-details-routing.module';

import { HighlightDetailsPage } from './highlight-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HighlightDetailsPageRoutingModule
  ],
  declarations: [HighlightDetailsPage]
})
export class HighlightDetailsPageModule {}
