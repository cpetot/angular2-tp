import { Component, Input, OnInit, OnChanges } from 'angular2/core';
import { RouteParams } from 'angular2/router';

import { Collaborator } from './collaborator';
import { CollaboratorService } from './collaborator.service';


@Component({
  selector: 'my-collaborator-detail',
  templateUrl: 'app/collaborator-detail.component.html',
  styleUrls: ['app/collaborator-detail.component.css']
})
export class CollaboratorDetailComponent implements OnInit, OnChanges {
  @Input() collaborator: Collaborator;
  //Boolean permettant de savoir si l'on vient par le path ou par l'utilisation
  //du composant dans une autre page
  // true ==> on vient par le path, donc on peut faire un retour à la page précédente(back)
  // false ==> utilisation sous forme de composant, on ne peut pas retourner à la page précédente
  isBackAvailable : boolean = false;
  managers : Collaborator[] = [];
  collaborators : Collaborator[] = [];

  constructor(
    private _collaboratorService: CollaboratorService,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    Promise.resolve(this.getCurrentCollaborator()).then(() => {
          this.update();
        }
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

  ngOnChanges(changes: {[propName: string]: any}) {
    //Lorsque l'on change la valeur de l'attribut "collaborator"
    //on souhaite mettre à jour le composant
    //Mais cette méthode est appelé également à la première initialisation
    //Pour éviter un doublon d'appel, on ne met à jour le composant
    //seulement si une valeur été initialisée auparavant
    if (changes['collaborator'].previousValue != {}) {
      this.update();
    }
  }

  collabClicked(collaborator : Collaborator) {
    this.collaborator = collaborator;
    this.update();
  }
}
