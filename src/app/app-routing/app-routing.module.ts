import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthorsComponent} from '../shared/authors/authors.component';
import {ArticlesComponent} from '../shared/articles/articles/articles.component';
import {NotFoundComponent} from '../shared/not-found/not-found.component';
import {AuthorComponent} from '../shared/authors/author/author.component';
import {ArticleComponent} from '../shared/articles/article/article.component';
import {SearchResultComponent} from '../shared/search/search-result/search-result.component';
import {LoginComponent} from '../shared/login/login/login.component';
import {AuthGuard} from '../auth/auth.guard';


const routes: Routes = [
  { path: 'articles',  canActivate: [AuthGuard], component: ArticlesComponent},
  { path: 'articles/:id', canActivate: [AuthGuard], component: ArticleComponent},
  { path: 'authors', canActivate: [AuthGuard], component: AuthorsComponent},
  { path: 'authors/:id', canActivate: [AuthGuard], component: AuthorComponent},
  { path: 'search-results', canActivate: [AuthGuard], component: SearchResultComponent},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'articles', pathMatch: 'full' },
  { path: 'not-found', canActivate: [AuthGuard], component: NotFoundComponent },
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
