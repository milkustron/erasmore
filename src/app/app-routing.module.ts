import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterLink, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { EventPage } from './tab3/event/event.page';
import { HighlightDetailsPage } from './tab2/highlight-details/highlight-details.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'highlight-details/:id', // ✅ this must match exactly
    component: HighlightDetailsPage
  },
  { path: 'event/:eventId', component: EventPage },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule, RouterOutlet, RouterLink]
})
export class AppRoutingModule {}
