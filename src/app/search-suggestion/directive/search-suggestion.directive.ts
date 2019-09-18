import { Directive, ElementRef, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ConnectionPositionPair, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { TemplatePortal } from '@angular/cdk/portal';

import { SearchSuggestionComponent } from '../search-suggestion.component';

@Directive({
  selector: '[appSearchSuggestion]'
})
export class SearchSuggestionDirective implements OnInit, OnDestroy {
  @Input()
  appSearchSuggestion: SearchSuggestionComponent;

  @Input()
  categoryToSearchFunctionMap: Map<string, (s: string) => Observable<string[]>>;

  private allCategories: string[];

  private changeSubscription: Subscription;

  private overlayRef: OverlayRef;

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private ngControl: NgControl,
    private vcr: ViewContainerRef,
    private overlay: Overlay
  ) {
    this.categoryToSearchFunctionMap.forEach((value, key) => {
      this.allCategories.push(key);
    });
  }

  get control() {
    return this.ngControl.control;
  }

  ngOnInit() {
    this.changeSubscription = fromEvent(this.origin, 'change').subscribe((event) => {
      const category = this.getCategory(this.control.value);
      if (category) {
        this.categoryToSearchFunctionMap.get(category)(this.control.value.toString().replace('@' + category, ''))
          .subscribe(searchResults => {
            this.appSearchSuggestion.searchResults = searchResults;
            this.openDropdown();

            this.appSearchSuggestion.searchResultClick()
              .pipe(takeUntil(this.overlayRef.detachments()))
              .subscribe((value: string) => {
                this.control.setValue(value);
                this.close();
              });
          });
      }
    });
  }

  getCategory(searchText: string): string {
    const matchingCategories = this.allCategories.filter(category => {
      return searchText.startsWith(category, 1);
    });
    return matchingCategories.length > 0 ? matchingCategories[0] : null;
  }

  openDropdown() {
    this.overlayRef = this.overlay.create({
      width: this.origin.offsetWidth,
      maxHeight: 40 * 3,
      backdropClass: '',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.getOverlayPosition()
    });

    const template = new TemplatePortal(this.appSearchSuggestion.rootTemplate, this.vcr);
    this.overlayRef.attach(template);

    overlayClickOutside(this.overlayRef, this.origin).subscribe(() => this.close());
  }

  ngOnDestroy() {
    this.changeSubscription.unsubscribe();
  }

  private close() {
    this.overlayRef.detach();
    this.overlayRef = null;
  }

  private getOverlayPosition() {
    const positions = [
      new ConnectionPositionPair(
        {originX: 'start', originY: 'bottom'},
        {overlayX: 'start', overlayY: 'top'}
      ),
      new ConnectionPositionPair(
        {originX: 'start', originY: 'top'},
        {overlayX: 'start', overlayY: 'bottom'}
      )
    ];

    return this.overlay
      .position()
      .flexibleConnectedTo(this.origin)
      .withPositions(positions)
      .withFlexibleDimensions(false)
      .withPush(false);
  }

  get origin() {
    return this.host.nativeElement;
  }
}

export function overlayClickOutside(overlayRef: OverlayRef, origin: HTMLElement) {
  return fromEvent<MouseEvent>(document, 'click')
    .pipe(
      filter(event => {
        const clickTarget = event.target as HTMLElement;
        const notOrigin = clickTarget !== origin; // the input
        const notOverlay = !!overlayRef && (overlayRef.overlayElement.contains(clickTarget) === false); // the autocomplete
        return notOrigin && notOverlay;
      }),
      takeUntil(overlayRef.detachments())
    );
}
