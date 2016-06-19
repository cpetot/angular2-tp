import { Component } from '@angular/core';
import { RouterConfig, ROUTER_DIRECTIVES, provideRouter } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { CollaboratorsComponent } from './collaborators.component';
import { CollaboratorDetailComponent } from './collaborator-detail.component';
import { CollaboratorService } from './collaborator.service';

const routes = [
  {
    path: '',
    component: DashboardComponent,
    index:true
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'detail/:id',
    component: CollaboratorDetailComponent
  },
  {
    path: 'collaborators',
    component: CollaboratorsComponent
  },
  {
    path: 'collaborators/:id',
    component: CollaboratorsComponent
  }
];

const routeConfig : RouterConfig = [
  ...routes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routeConfig)
];

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.html',
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    CollaboratorService
  ]
})
export class AppComponent {
  title = 'Trombinoscope Viseo';
}
