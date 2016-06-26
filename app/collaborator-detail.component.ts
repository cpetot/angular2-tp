import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Collaborator } from './collaborator';
import { CollaboratorService } from './collaborator.service';

import {CompetencesComponent} from './competences.component';

@Component({
  selector: 'my-collaborator-detail',
  templateUrl: 'app/collaborator-detail.component.html',
  styleUrls: ['app/collaborator-detail.component.css'],
  directives: [CompetencesComponent]
})
export class CollaboratorDetailComponent implements OnInit, OnDestroy {
  @Input() collaborator: Collaborator;

  /**
   * Variable qui contiendra l'objet observable de la route actuelle
   * Cela permet de ne pas recharger le composant et de le détruire
   * Si nous changeons juste le paramètre de la page
  **/
  private sub : any;

  managers : Collaborator[] = [];
  collaborators : Collaborator[] = [];

  constructor(
    private _collaboratorService: CollaboratorService,
    private _router : Router,
    private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
      this.sub = this._activatedRoute.params.subscribe(params => {
        let id = +params['id'];
        this._collaboratorService.getCollaborator(id)
          .then(collaborator => this.collaborator = collaborator)
          .then(() => this.update());
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  getManagers() {
    this._collaboratorService.getAvailableManagers(this.collaborator)
      .then(managers => this.managers = managers);
  }

  /*
   * Méthode permettant de retourner les collaborateurs gérée par le collaborateur courant.
  **/
  getManagedCollaborators() {
    this._collaboratorService.getManagedCollaborators(this.collaborator)
      .then(collaborators => this.collaborators = collaborators);
  }

  goBack() {
    window.history.back();
  }

  onImageSelected($event: any) {
    let file: File = $event.srcElement.files[0];
    let fileReader : FileReader= new FileReader();
    // TODO Understand how to pass 'this' to onLoad function
    let that = this;
    fileReader.onload = function (e : ProgressEvent) {
      that.collaborator.image = fileReader.result;
    };
    fileReader.readAsDataURL(file);
  }

  /**
   * Met à jour les différentes propriétés à partir du collaborateur
  **/
  update() {
    this.getManagers();
    this.getManagedCollaborators();
  }

  /**
   * Permet d'être redirigé vers le détail d'un collaborateur.
   * La redirection est relative à l'url courante.
   * Ce composant attendant l'id du collaborateur en dernier paramètre
  **/
  gotoDetail(idCollab : number) {
    this._router.navigate(['../', idCollab], {relativeTo: this._activatedRoute});
  }
}
