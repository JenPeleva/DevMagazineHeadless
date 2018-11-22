import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthorsComponent} from '../shared/authors/authors.component';
import {ArticlesComponent} from '../shared/articles/articles/articles.component';
import {NotFoundComponent} from '../shared/not-found/not-found.component';
import {AuthorComponent} from '../shared/authors/author/author.component';
import {ArticleComponent} from '../shared/articles/article/article.component';
import {SearchResultComponent} from '../shared/search/search-result/search-result.component';


const routes: Routes = [
  { path: 'articles', component: ArticlesComponent},
  { path: 'articles/:id', component: ArticleComponent},
  { path: 'authors', component: AuthorsComponent},
  { path: 'authors/:id', component: AuthorComponent},
  { path: 'search-results', component: SearchResultComponent},
  { path: '', redirectTo: 'articles', pathMatch: 'full' },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
