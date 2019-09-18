import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchSuggestionModule } from './search-suggestion/search-suggestion.module';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    OverlayModule,
    ReactiveFormsModule,
    SearchSuggestionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
