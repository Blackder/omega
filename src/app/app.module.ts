import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiModule, BASE_PATH } from './services/api';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ComponentGenerationScreenModule } from './component-generation/component-generation-screen/component-generation-screen.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalErrorHandler } from './error-handler/error-handler';
import { ErrorDialogModule } from './error-handler/error-dialog/error-dialog.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApiModule,
    ComponentGenerationScreenModule,
    BrowserAnimationsModule,
    ErrorDialogModule,
  ],
  providers: [
    {
      provide: BASE_PATH,
      useValue: environment.apiBasePath,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
