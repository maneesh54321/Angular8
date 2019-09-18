import { Component, ContentChild, ContentChildren, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { SearchSuggestionContentDirective } from './directive/search-suggestion-content.directive';
import { SearchResultComponent } from './search-result/search-result.component';
import { switchMap } from 'rxjs/operators';
import { merge } from 'rxjs';

@Component({
  selector: 'app-search-suggestion',
  template: `
      <ng-template #root>
          <div class="search-suggestions">
              <app-search-result *ngFor="let result of searchResults" [value]="result">
                  {{ result }}
              </app-search-result>
              <app-search-result class="no-result" *ngIf="!searchResults.length">No result...</app-search-result>
          </div>
      </ng-template>
  `,
  exportAs: 'appSearchSuggestion',
  styleUrls: ['./search-suggestion.component.scss']
})
export class SearchSuggestionComponent {

  @ViewChild('root') rootTemplate: TemplateRef<any>;

  // @ContentChild(SearchSuggestionContentDirective)
  // content: SearchSuggestionContentDirective;

  searchResults: string[];

  @ContentChildren(SearchResultComponent) options: QueryList<SearchResultComponent>;

  searchResultClick() {
    return this.options.changes.pipe(
      switchMap(options => {
        const clicks$ = options.map(option => option.click$);
        return merge(...clicks$);
      })
    );
  }

}
