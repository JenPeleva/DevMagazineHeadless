import {Injectable} from '@angular/core';
import {SitefinityService} from './sitefinity.service';
import {ReplaySubject} from 'rxjs';
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

  getAllArticles(count?: number): ReplaySubject<any> {
    let query;
    const articlesReplaySubject = new ReplaySubject<any>(1);
    this.sitefinity.instance.then((result) => {
      if (count) {
        query = this.sitefinity.query.select('Title', 'Id', 'Content', 'DateCreated', 'Summary', 'UrlName')
          .expand('ArticleAuthor', 'Image').order('Title desc').take(count);
      } else {
        query = this.sitefinity.query.select('Title', 'Id', 'Content', 'DateCreated', 'Summary', 'UrlName')
          .expand('ArticleAuthor', 'Image').order('Title desc');
      }
      result.data(articlesDataOptions).get({
        query: query,
        successCb: data => articlesReplaySubject.next(data)
      });
    },
  (error) => {
    articlesReplaySubject.next(error);
    });
    return articlesReplaySubject;
  }

  getArticle(id: string) {
    const articleReplaySubject = new ReplaySubject<any>(1);
    this.sitefinity.instance.then((result) => {
        result.data(articlesDataOptions).getSingle({
          key: id,
          query: this.sitefinity.query.select('Title', 'Id', 'Content', 'DateCreated', 'Summary', 'UrlName')
            .expand('ArticleAuthor', 'Image').order('Title desc'),
          successCb: data => articleReplaySubject.next(data)
        });
      },
      (error) => {
        articleReplaySubject.next(error);
      });
    return articleReplaySubject;
  }

  getAllArticlesCount(): ReplaySubject<any> {
    const articleReplaySubject = new ReplaySubject<any>(1);
    this.sitefinity.instance.then((result) => {
        result.data(articlesDataOptions).get({
          query: this.sitefinity.query.count(false),
          successCb: data => articleReplaySubject.next(data)
        });
      },
      (error) => {
        articleReplaySubject.next(error);
      });
    return articleReplaySubject;
  }

  returnArticle(article: any): Article  {
    const articleObj = {
      id: article.Id,
      content: article.Content,
      dateCreated: article.DateCreated,
      summary: article.Summary,
      title: article.Title,
      urlName: article.UrlName,
      articleAuthor: article.ArticleAuthor ? {
      bio: article.ArticleAuthor.Bio,
      id: article.ArticleAuthor.Id,
      jobTitle: article.ArticleAuthor.JobTitlel,
      name: article.ArticleAuthor.Name,
      urlName: article.ArticleAuthor.UrlName,
      avatar: article.ArticleAuthor.Avatar ? {
        url: article.ArticleAuthor.Avatar.Url,
        thumbnailUrl: article.ArticleAuthor.Avatar.Avatar.ThumbnailUrl,
        width: article.ArticleAuthor.Avatar.Width,
        height: article.ArticleAuthor.Avatar.Height,
        alternativeText: article.ArticleAuthor.Avatar.AlternativeText
      } : null
    } : null,
      image: article.Image ? {
      url:  article.Image.Url,
      alternativeText:  article.Image.AlternativeText,
      width:  article.Image.Width,
      height:  article.Image.Height,
      thumbnailUrl: article.Image.ThumbnailUrl
    } : null
    };

    return articleObj;
  }
}
