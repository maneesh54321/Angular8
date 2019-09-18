import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchSuggestionComponent } from './search-suggestion.component';
import { SearchSuggestionDirective } from './directive/search-suggestion.directive';
import { SearchSuggestionContentDirective } from './directive/search-suggestion-content.directive';
import { SearchResultComponent } from './search-result/search-result.component';

@NgModule({
  declarations: [
    SearchSuggestionComponent,
    SearchSuggestionDirective,
    SearchSuggestionContentDirective,
    SearchResultComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchSuggestionComponent,
    SearchSuggestionDirective,
    SearchSuggestionContentDirective,
    SearchResultComponent
  ]
})
export class SearchSuggestionModule {
}
