import { Component, OnInit } from '@angular/core';
import {AuthorsService} from '../../services/authors.service';
import {ActivatedRoute} from '@angular/router';
import {Article} from '../articles/articles.component';
import {ArticlesService} from '../../services/articles.service';
import {RxBaseComponent} from '../../common/rx-base/rx-base.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent extends RxBaseComponent implements OnInit {
  subscription: Subscription;
  article: Article;

  constructor(private articlesService: ArticlesService, private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.getArticle();
    this.registerSubscription(this.subscription);
  }

  getArticle() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.subscription = this.articlesService.getArticle(id).subscribe((article) => {
        this.article = this.articlesService.returnArticle(article);
      });
    }
  }
}
