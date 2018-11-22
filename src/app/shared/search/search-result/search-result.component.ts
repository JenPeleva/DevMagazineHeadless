import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchService} from '../../services/search.service';
import {RxBaseComponent} from '../../common/rx-base/rx-base.component';
import {Subscription} from 'rxjs';
import {SearchResultItem} from '../search.component';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent extends RxBaseComponent implements OnInit  {
  searchTriggeredSubscription: Subscription;
  dataSubscription: Subscription;
  searchResults: SearchResultItem[] = [];

  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit() {
    this.searchTriggeredSubscription = this.searchService.searchTriggered.subscribe((data) => {
      this.dataSubscription = data.subscribe((results) => {
          this.searchResults = this.searchService.mapSearchResults(results);
      });
      this.registerSubscription(this.dataSubscription);
    });
    this.registerSubscription(this.searchTriggeredSubscription);
  }
}
