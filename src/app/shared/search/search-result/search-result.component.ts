import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchService} from '../../services/search.service';
import {RxBaseComponent} from '../../common/rx-base/rx-base.component';
import {Observable, ReplaySubject, Subscription} from 'rxjs';
import {SearchResultItem} from '../search.component';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent extends RxBaseComponent implements OnInit  {
  searchResults:Observable<any>;

  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit() {
    this.searchResults = this.searchService.searchResults;
  }
}
