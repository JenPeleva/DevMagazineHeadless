import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {SitefinityService} from './sitefinity.service';
import {Author} from '../authors/authors.component';
export const authorsDataOptions = {
  urlName: 'authors'
};

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private sitefinity: SitefinityService) { }

  getAuthors(): ReplaySubject<Author[]> {
    const authorsReplaySubject = new ReplaySubject<Author[]>(1);
    this.sitefinity.instance.then((result) => {
        result.data(authorsDataOptions).get({
          query: this.sitefinity.query.select('Bio', 'Id', 'JobTitle', 'Name', 'UrlName')
            .expand('Avatar').order('Name desc'),
          successCb: data => authorsReplaySubject.next(data.value as Author[])
        });
      },
      (error) => {
        authorsReplaySubject.next(error);
      });
    return authorsReplaySubject;
  }

  getAuthor(id: string): ReplaySubject<Author> {
    const authorReplaySubject = new ReplaySubject<Author>(1);
    this.sitefinity.instance.then((result) => {
        result.data(authorsDataOptions).getSingle({
          query: this.sitefinity.query.select('Bio', 'Id', 'JobTitle', 'Name', 'UrlName')
            .expand('Avatar').order('Name desc'),
          key: id,
          successCb: (data: Author) => {authorReplaySubject.next(data)}
        });
      },
      (error) => {
        authorReplaySubject.next(error);
      });
    return authorReplaySubject;
  }

  // returnAuthor(author: any): Author {
  //   const authorObj = {
  //     bio: author.Bio,
  //     id: author.Id,
  //     jobTitle: author.JobTitle,
  //     name: author.Name,
  //     urlName: author.UrlName,
  //     avatar: author.Avatar ?  {
  //       url: author.Avatar ? author.Avatar.Url : null,
  //       thumbnailUrl: author.Avatar ? author.Avatar.ThumbnailUrl : null,
  //       width: author.Avatar ? author.Avatar.Width : null,
  //       height: author.Avatar ? author.Avatar.Height : null,
  //       alternativeText: author.Avatar ? author.Avatar.AlternativeText : null
  //     } : null
  //   };

  //   return authorObj;
  // }
}
