import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appSearchSuggestionContent]'
})
export class SearchSuggestionContentDirective {

  constructor( public tpl: TemplateRef<any> ) {
  }

}
