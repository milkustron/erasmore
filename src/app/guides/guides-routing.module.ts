import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuidesPage } from './guides.page';

const routes: Routes = [
  {
    path: '',
    component: GuidesPage,
  },
  { path: 'highlight-details/:id', loadChildren: () => import('./highlight-details/highlight-details.module').then(m => m.HighlightDetailsPageModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuidesPageRoutingModule {}
