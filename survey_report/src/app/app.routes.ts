// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SurveyPageComponent } from './survey-page/survey-page.component';
import { ListSurveysComponent } from './list-surveys/list-surveys.component';
import { ModifySurveysComponent } from './modify-surveys/modify-surveys.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'survey', component: SurveyPageComponent },
  { path: 'survey/:id', component: SurveyPageComponent },
  { path: 'list-surveys', component: ListSurveysComponent },
  { path: 'modify-surveys', component: ModifySurveysComponent }
];

