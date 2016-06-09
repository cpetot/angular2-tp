import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Collaborator } from './collaborator';
import { CollaboratorDetailComponent } from './collaborator-detail.component';
import { CollaboratorService } from './collaborator.service';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/collaborators.component.html',
  styleUrls:  ['app/collaborators.component.css'],
  directives: [CollaboratorDetailComponent]
})
export class CollaboratorsComponent implements OnInit {
  collaborators: Collaborator[];
  selectedCollaborator: Collaborator;

  constructor(
    private _router: Router,
    private _collaboratorService: CollaboratorService) { }

  getCollaborators() {
    this._collaboratorService.getCollaborators().then((collaborators) => this.collaborators = collaborators);
  }

  ngOnInit() {
    this.getCollaborators();
  }

  onSelect(collaborator: Collaborator) { this.selectedCollaborator = collaborator; }

  gotoDetail() {
    this._router.navigate(['CollaboratorDetail', { id: this.selectedCollaborator.id }]);
  }
}
