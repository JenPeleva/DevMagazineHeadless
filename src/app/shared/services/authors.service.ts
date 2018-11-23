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
    this.sitefinity.instance.data(authorsDataOptions).get({
      query: this.sitefinity.query.select('Bio', 'Id', 'JobTitle', 'Name', 'UrlName')
        .expand('Avatar').order('Name desc'),
      successCb: data => authorsReplaySubject.next(data.value as Author[]),
      failureCb: data => console.log(data)
    });

    return authorsReplaySubject;
  }

  getAuthor(id: string): ReplaySubject<Author> {
    const authorReplaySubject = new ReplaySubject<Author>(1);
    this.sitefinity.instance.data(authorsDataOptions).getSingle({
      query: this.sitefinity.query.select('Bio', 'Id', 'JobTitle', 'Name', 'UrlName')
        .expand('Avatar').order('Name desc'),
      key: id,
      successCb: (data: Author) => {authorReplaySubject.next(data)},
      failureCb: data => console.log(data)
    });
    return authorReplaySubject;
  }

}
