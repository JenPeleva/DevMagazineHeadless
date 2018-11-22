import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SearchService} from '../services/search.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(private searchService: SearchService) {}

  onEnter(event: any) {
      this.searchService.triggerSearch(event.target.value);
  }
}

export class SearchResultItem {
  title: string;
  detailLink: string;
  content: string;
}
