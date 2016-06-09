import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';

import { Collaborator } from './collaborator';
import { CollaboratorService } from './collaborator.service';

@Component({
  selector: 'my-collaborator-detail',
  templateUrl: 'app/collaborator-detail.component.html',
  styleUrls: ['app/collaborator-detail.component.css']
})
export class CollaboratorDetailComponent implements OnInit {
  @Input() collaborator: Collaborator;
  //Boolean permettant de savoir si l'on vient par le path ou par l'utilisation
  //du composant dans une autre page
  // true ==> on vient par le path, donc on peut faire un retour à la page précédente(back)
  // false ==> utilisation sous forme de composant, on ne peut pas retourner à la page précédente
  isBackAvailable : boolean = false;
  managers : Collaborator[] = [];

  constructor(
    private _collaboratorService: CollaboratorService,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    Promise.resolve(this.getCurrentCollaborator()).then(() =>
          this.getManagers()
      );
  }

  getCurrentCollaborator() {
    //Si on a passé le paramètre collaborateur à notre composant par le biais du tag
    //on ne cherche pas dans le routeParams car la valeur est déjà renseignée.
    if(this.collaborator == undefined) {
      let id = +this._routeParams.get('id');
      this.isBackAvailable = true;
      return this._collaboratorService.getCollaborator(id)
        .then(collaborator => this.collaborator = collaborator);
    } else {
      return Promise.resolve(this.collaborator);
    }
  }

  getManagers() {
    this._collaboratorService.getAvailableManagers(this.collaborator)
      .then(managers => this.managers = managers);
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
}
