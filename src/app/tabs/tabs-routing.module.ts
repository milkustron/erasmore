import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'progression',
        loadChildren: () => import('../progression/progression.module').then(m => m.ProgressionPageModule)
      },
      {
        path: 'guides',
        loadChildren: () => import('../guides/guides.module').then(m => m.GuidesPageModule)
      },
      {
        path: 'activities',
        loadChildren: () => import('../activities/activities.module').then(m => m.ActivitiesPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/progression',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/progression',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
