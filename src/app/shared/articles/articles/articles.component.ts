import { Component, OnInit } from '@angular/core';
import {ArticlesService} from '../../services/articles.service';
import {AuthorsService} from '../../services/authors.service';
import {Author} from '../../authors/authors.component';
import {RxBaseComponent} from '../../common/rx-base/rx-base.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent extends RxBaseComponent implements OnInit {
  articles: Article[] = [];
  itemsCount = 10;
  allItemsCount: number;
  subscription: Subscription;
  allSubscription: Subscription;
  get shouldShowLoadMore(): boolean {
    return this.allItemsCount > this.itemsCount;
  }

  constructor(private articlesService: ArticlesService) {
    super();
  }

  ngOnInit() {
    this.getArticles();
    this.getAllArticlesCount();
    this.registerSubscription(this.subscription);
    this.registerSubscription(this.allSubscription);
  }

  LoadMore() {
    this.itemsCount += 10;
    this.getArticles();
  }

  getArticles() {
    this.subscription = this.articlesService.getAllArticles(this.itemsCount).subscribe((data) => {
      data.value.forEach((article) => {
        this.articles.push(this.articlesService.returnArticle(article));
      });
    });
  }

  getAllArticlesCount() {
    this.articlesService.getAllArticlesCount().subscribe((data) => {
      this.allItemsCount =  data;
    });
  }
}

export class Article {
  id: string;
  content: string;
  dateCreated: string;
  summary: string;
  title: string;
  urlName: string;
  articleAuthor?: Author;
  image?: any;
}

export class RelatedImage {
  url?: string;
  alternativeText: string;
  width: string;
  height: string;
  thumbnailUrl;
}
