import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Collaborator } from './collaborator';
import { CollaboratorService } from './collaborator.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  collaborators: Collaborator[] = [];

  constructor(
    private _router: Router,
    private _collaboratorService: CollaboratorService) {
  }

  ngOnInit() {
    this._collaboratorService.getCollaborators()
      .then(collaborators => this.collaborators = collaborators);
  }

  gotoDetail(collaborator: Collaborator) {
    let link = ['/detail', collaborator.id ];
    this._router.navigate(link);
  }
}
