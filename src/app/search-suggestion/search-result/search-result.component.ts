import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-search-result',
  template: `
      <div class="option">
          <ng-content></ng-content>
      </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  @Input() value: string;

  click$: Observable<string>;

  constructor(private host: ElementRef) {
  }

  ngOnInit() {
    this.click$ = fromEvent(this.element, 'click').pipe(mapTo(this.value));
  }

  get element() {
    return this.host.nativeElement;
  }

}
