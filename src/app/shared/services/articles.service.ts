import {Injectable} from '@angular/core';
import {SitefinityService} from './sitefinity.service';
import {ReplaySubject, Observable} from 'rxjs';
import {Article} from '../articles/articles/articles.component';
export const articlesDataOptions = {
  urlName: 'newsitems',
  providerName: 'OpenAccessDataProvider',
  cultureName: 'en'
};

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private sitefinity: SitefinityService) { }

  getAllArticles(take?: number, skip?: number): Observable<Article[]> {
    let query;
    const articlesReplaySubject = new ReplaySubject<Article[]>(1);
    this.sitefinity.instance.then((result) => {
      if (take !== null && skip !== null) {
        query = this.sitefinity.query.select('Title', 'Id', 'Content', 'DateCreated', 'Summary', 'UrlName')
          .expand('ArticleAuthor', 'Image').order('Title desc').skip(skip).take(take);
      } else {
        query = this.sitefinity.query.select('Title', 'Id', 'Content', 'DateCreated', 'Summary', 'UrlName')
          .expand('ArticleAuthor', 'Image').order('Title desc');
      }
      result.data(articlesDataOptions).get({
        query: query,
        successCb: data => articlesReplaySubject.next(data.value as Article[])
      });
    },
  (error) => {
    articlesReplaySubject.next(error);
    });
    return articlesReplaySubject.asObservable();
  }

  getArticle(id: string): Observable<Article> {
    const articleReplaySubject = new ReplaySubject<any>(1);
    this.sitefinity.instance.then((result) => {
        result.data(articlesDataOptions).getSingle({
          key: id,
          query: this.sitefinity.query.select('Title', 'Id', 'Content', 'DateCreated', 'Summary', 'UrlName')
            .expand('ArticleAuthor', 'Image').order('Title desc'),
          successCb: (data: Article) => {articleReplaySubject.next(data)}
        });
      },
      (error) => {
        articleReplaySubject.next(error);
      });
    return articleReplaySubject.asObservable();
  }

  getAllArticlesCount(): Observable<number> {
    const articleReplaySubject = new ReplaySubject<any>(1);
    this.sitefinity.instance.then((result) => {
        result.data(articlesDataOptions).get({
          query: this.sitefinity.query.count(false),
          successCb: (data: number) => articleReplaySubject.next(data)
        });
      },
      (error) => {
        articleReplaySubject.next(error);
      });
    return articleReplaySubject.asObservable();
  }
}
