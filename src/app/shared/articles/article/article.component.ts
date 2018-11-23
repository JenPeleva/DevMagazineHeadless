import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Article} from '../articles/articles.component';
import {ArticlesService} from '../../services/articles.service';
import {RxBaseComponent} from '../../common/rx-base/rx-base.component';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html'
})
export class ArticleComponent extends RxBaseComponent implements OnInit {
  article: Observable<Article>;

  constructor(private articlesService: ArticlesService, private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.getArticle();
  }

  getArticle() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.article = this.articlesService.getArticle(id);
    }
  }
}
