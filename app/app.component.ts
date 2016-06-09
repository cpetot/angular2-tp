import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { DashboardComponent } from './dashboard.component';
import { CollaboratorsComponent } from './collaborators.component';
import { CollaboratorDetailComponent } from './collaborator-detail.component';
import { CollaboratorService } from './collaborator.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.html',
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    CollaboratorService
  ]
})
@RouteConfig([
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/detail/:id',
    name: 'CollaboratorDetail',
    component: CollaboratorDetailComponent
  },
  {
    path: '/collaborators',
    name: 'Collaborators',
    component: CollaboratorsComponent
  }
])
export class AppComponent {
  title = 'Trombinoscope Viseo';
}
