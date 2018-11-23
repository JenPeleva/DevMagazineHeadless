import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthorsService} from '../../services/authors.service';
import {Author} from '../authors.component';
import {ArticlesService} from '../../services/articles.service';
import {RxBaseComponent} from '../../common/rx-base/rx-base.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html'
})
export class AuthorComponent extends RxBaseComponent implements OnInit {
  author: Author;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private authorsService: AuthorsService) {
    super();
  }

  ngOnInit() {
    this.getAuthor();
    this.registerSubscription(this.subscription);
  }

  getAuthor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
     this.subscription =  this.authorsService.getAuthor(id).subscribe((author) => {
        this.author = author;
      });
    }
  }
}
