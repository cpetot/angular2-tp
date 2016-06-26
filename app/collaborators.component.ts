import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Collaborator } from './collaborator';
import { CollaboratorDetailComponent } from './collaborator-detail.component';
import { CollaboratorService } from './collaborator.service';
import { CollaboratorsPipe } from './collaborators.pipe'

@Component({
  selector: 'collaborators',
  templateUrl: 'app/collaborators.component.html',
  styleUrls:  ['app/collaborators.component.css'],
  directives: [CollaboratorDetailComponent],
  pipes: [CollaboratorsPipe]
})
export class CollaboratorsComponent implements OnInit {
  collaborators: Collaborator[];
  selectedCollaborator: Collaborator;
  searchText : String = "";

  /**
   * Variable qui contiendra l'objet observable de la route actuelle
   * Cela permet de ne pas recharger le composant et de le détruire
   * Si nous changeons juste le paramètre de la page
  **/
  private sub : any;

  constructor(
    private _router: Router,
    private _collaboratorService: CollaboratorService,
    private _activatedRoute : ActivatedRoute) { }

  getCollaborators() {
    this._collaboratorService.getCollaborators().then((collaborators) => this.collaborators = collaborators);
  }

  ngOnInit() {
    this.getCollaborators();

    this.sub = this._activatedRoute.params.subscribe(params => {
      let id = +params['id'];
      if(params['searchText']) {
        this.searchText = decodeURIComponent(params['searchText']);
      }
      this._collaboratorService.getCollaborator(id)
        .then(collaborator => this.selectedCollaborator = collaborator);
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSelect(collaborator: Collaborator) {
    this.selectedCollaborator = collaborator;
    this.gotoDetail();
  }

  gotoDetail() {
    //On utilise {searchText:  this.searchText} pour que cette information
    //soit considérée comme un paramètre de requête et non pas comme
    //une partie de l'url
    this._router.navigate(['/collaborators', this.selectedCollaborator.id,
    {searchText:  this.searchText} ]);
  }
}
