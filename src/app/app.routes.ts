import { Route } from '@angular/router';
import { BuilderComponent } from './components/form/builder/builder.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AnswerComponent } from './components/form/answer/answer.component';
export const appRoutes: Route[] = [
  {
    path: 'form/builder',
    component: BuilderComponent,
  },
  {
    path: 'form/answers',
    component: AnswerComponent,
  },
  {
    path: '',
    redirectTo: 'form/builder',
    pathMatch: 'full',
  },
  { path: '**', component: PageNotFoundComponent },
];
