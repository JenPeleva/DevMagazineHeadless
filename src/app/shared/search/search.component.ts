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
      this.searchService.search(event.target.value);
  }
}

export class SearchResultItem {
  Title: string;
  DetailLink: string;
  Content: string;
}
