import { Component, OnInit } from '@angular/core';
import {AuthorsService} from '../services/authors.service';
import {RelatedImage} from '../articles/articles/articles.component';
import {Observable} from 'rxjs';
import {RxBaseComponent} from '../common/rx-base/rx-base.component';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent extends RxBaseComponent implements OnInit {
  authors: Observable<Author[]>;

  constructor(private authorsService: AuthorsService) {
    super();
  }

  ngOnInit() {
    this.authors =  this.authorsService.getAuthors();
  }
}

export class Author {
  Bio: string;
  Id: string;
  JobTitle: string;
  Name: string;
  UrlName: string;
  Avatar?: RelatedImage;
}
