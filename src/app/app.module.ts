import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiModule, BASE_PATH } from './services/api';
import { ComponentListModule } from './component-generation/component-list/component-list.module';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ComponentGenerationScreenModule } from './component-generation/component-generation-screen/component-generation-screen.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApiModule,
    ComponentGenerationScreenModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: BASE_PATH,
      useValue: environment.apiBasePath,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
