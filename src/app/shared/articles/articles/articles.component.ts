import { Component, OnInit } from '@angular/core';
import {ArticlesService} from '../../services/articles.service';
import {Author} from '../../authors/authors.component';
import {RxBaseComponent} from '../../common/rx-base/rx-base.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html'
})
export class ArticlesComponent extends RxBaseComponent implements OnInit {
  articles: Article[] = [];
  private allItemsCount: number;
  private subscription: Subscription;
  private articlesCountSubscription: Subscription;

  get shouldShowLoadMore(): boolean {
    return this.allItemsCount > this.articles.length;
  }

  constructor(private articlesService: ArticlesService) {
    super();
  }

  ngOnInit() {
    this.getArticles();
    this.getAllArticlesCount();
    this.registerSubscription(this.subscription);
    this.registerSubscription(this.articlesCountSubscription);
  }

  LoadMore() {
    this.getArticles();
  }

  getArticles() {
    this.subscription = this.articlesService.getAllArticles(10, this.articles.length).subscribe((data: Article[]) => {
      data.forEach((article) => {
        this.articles.push(article);
      });
    });
  }

  getAllArticlesCount() {
    this.articlesCountSubscription = this.articlesService.getAllArticlesCount().subscribe((data) => {
      this.allItemsCount = data;
    });
  }
}

export class Article {
  Id: string;
  Content: string;
  DateCreated: string;
  Summary: string;
  Title: string;
  UrlName: string;
  ArticleAuthor?: Author;
  Image?: any;
}

export class RelatedImage {
  Url?: string;
  AlternativeText: string;
  Width: string;
  Height: string;
  ThumbnailUrl;
}
