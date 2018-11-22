import {EventEmitter, Injectable, Output} from '@angular/core';
import {SitefinityService} from './sitefinity.service';
import {ReplaySubject} from 'rxjs';
import {Router} from '@angular/router';
import {SearchResultItem} from '../search/search.component';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  @Output() searchTriggered = new EventEmitter<any>();

  constructor(private router: Router, private sitefinity: SitefinityService) { }

  triggerSearch(searchWord: string) {
    this.searchTriggered.next(this.getItemsBySearchWord(searchWord));
    this.router.navigate(['/search-results']);
  }

  getItemsBySearchWord(searchWord: string): ReplaySubject<any> {
    const searchReplaySubject = new ReplaySubject<any>(1);
    this.sitefinity.instance.then((sf) => {
      const batch = sf.batch(data => searchReplaySubject.next(data), data => console.log(data));
      batch.get({ entitySet: 'authors', query: this.sitefinity.query.select('Bio', 'JobTitle', 'Name').order('Name asc')
          .where().contains('Bio', searchWord).or().contains('JobTitle', searchWord).or().contains('Name', searchWord).done().done().done()});
      batch.get({ entitySet: 'newsitems', query: this.sitefinity.query.select('Title', 'Content', 'Summary').order('Title asc')
          .where().contains('Title', searchWord).or().contains('Content', searchWord).or().contains('Summary', searchWord).done().done().done()});
      batch.execute();
    });

    return searchReplaySubject;
  }

  mapSearchResults(result: any): SearchResultItem[] {
    const searchResults = [];
    const data = result.data;
    if (data.length > 0) {
      data.forEach((item) => {
        const context = item.response.data['@odata.context'];
        let contentType;
        const valuesArray = item.response.data.value;
        if (context) {
          contentType = context.substring(context.indexOf('#') + 1, context.indexOf('('));
        }

        if (valuesArray && valuesArray.length > 0) {
          switch (contentType) {
            case 'newsitems':
              valuesArray.forEach(contentItm => {
                searchResults.push({title: contentItm.Title, detailLink: '/articles/' + contentItm.Id, content: contentItm.Summary});
              });
              break;
            case 'authors':
              valuesArray.forEach(contentItm => {
                searchResults.push({title: contentItm.Name, detailLink: '/authors/' + contentItm.Id, content: contentItm.JobTitle});
              });
              break;
            default:
              break;
          }
        }
      });
    }

    return searchResults;
  }
}
