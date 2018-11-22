import { Component, OnInit } from '@angular/core';
import {AuthorsService} from '../services/authors.service';
import {RelatedImage} from '../articles/articles/articles.component';
import {Subscription} from 'rxjs';
import {RxBaseComponent} from '../common/rx-base/rx-base.component';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent extends RxBaseComponent implements OnInit {
  subscription: Subscription;
  constructor(private authorsService: AuthorsService) {
    super();
  }

  authors: Author[] = [];

  ngOnInit() {
   this.subscription =  this.authorsService.getAuthors().subscribe((data) => {
        data.value.forEach((author) => {
          this.authors.push(this.authorsService.returnAuthor(author));
        });
    });
    this.registerSubscription(this.subscription);
  }
}

export class Author {
  bio: string;
  id: string;
  jobTitle: string;
  name: string;
  urlName: string;
  avatar?: RelatedImage;
}
