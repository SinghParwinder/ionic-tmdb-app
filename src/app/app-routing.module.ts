import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CastPageModule } from './pages/cast/cast.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InfoPageModule } from './pages/info/info.module';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { LocalStorageService } from './common/providers/storage.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { LocalStorageEffect } from './state/effects/local-storage.effect';
import { LocalStorageProvaService } from './state/services/storage.service';
import { DetailsPageService } from './state/services/details-page.service';
import { appReducer } from './state/reducers/app.reducer';
import { ExplorePageEffect } from './state/effects/explore-page.effect';
import { ExplorePageService } from './state/services/explore-page.servicce';

const routes: Routes = [
  { path: '', loadChildren: './pages/explore/explore.module#ExplorePageModule' },
  { path: 'explore', loadChildren: './pages/explore/explore.module#ExplorePageModule' },
  { path: 'list', loadChildren: './pages/watchlist/watchlist.module#WatchListPageModule' },
  { path: 'collections', loadChildren: './pages/collections/collections.module#CollectionsPageModule' },
  { path: 'details', loadChildren: './pages/detail/detail.module#DetailPageModule' },
  { path: 'cast', loadChildren: './pages/cast/cast.module#CastPageModule' },
  { path: 'info', loadChildren: './pages/info/info.module#InfoPageModule' }
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/languages/", ".json");
}

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    CastPageModule,
    InfoPageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot({ 'appState': appReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([LocalStorageEffect, ExplorePageEffect])
  ],
  exports: [RouterModule],
  providers: [DetailsPageService,
    ExplorePageService,
    LocalNotifications,
    LocalStorageService,
    LocalStorageProvaService]
})
export class AppRoutingModule { }
