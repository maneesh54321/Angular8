import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'search-demo';

  options = [
    {id: 1, label: 'One'},
    {id: 2, label: 'Two'},
    {id: 3, label: 'Three'}
  ];

  control = new FormControl();

  categoryAndSearchFunctionMap: Map<string, (s: string) => Observable<string[]>>;

  constructor() {

  }

  ngOnInit(): void {
    this.categoryAndSearchFunctionMap = new Map<string, (s: string) => Observable<string[]>>();
    this.categoryAndSearchFunctionMap.set('trader', this.searchTraders);
    this.categoryAndSearchFunctionMap.set('client', this.searchClients);
    this.categoryAndSearchFunctionMap.set('exchange', this.searchExchanges);
    this.categoryAndSearchFunctionMap.set('platform', this.searchPlatforms);
  }

  searchTraders(s: string) {
    return of(['TraderOne', 'TraderTwo', 'TraderThree', 'TraderFour']);
  }

  searchClients(s: string) {
    return of(['ClientOne', 'ClientTwo', 'ClientThree', 'ClientFour']);
  }

  searchPlatforms(s: string) {
    return of(['PlatformOne', 'PlatformTwo', 'PlatformThree', 'PlatformFour']);
  }

  searchExchanges(s: string) {
    return of(['ExchangeOne', 'ExchangeTwo', 'ExchangeThree', 'ExchangeFour']);
  }
}
