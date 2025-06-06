import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HighlightDetailsPage } from './highlight-details.page';

const routes: Routes = [
  {
    path: '',
    component: HighlightDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HighlightDetailsPageRoutingModule {}
