import { Injectable } from 'angular2/core';

import { Collaborator } from './collaborator';
import { COLLABORATORS } from './mock-collaborators';

@Injectable()
export class CollaboratorService {
  getCollaborators() {
    return Promise.resolve(COLLABORATORS);
  }

  getCollaborator(id: number) {
    return Promise.resolve(COLLABORATORS).then(
      collaborators => collaborators.filter(collaborator => collaborator.id === id)[0]
    );
  }
  //Méthode permettant de renvoyer les managers pour un collaborateur
  //On a besoin de l'id du collaborateur pour filtrer et ne pas le remonter lui-même
  //dans le résultat
  getManagersForId(id : number) {
    return Promise.resolve(COLLABORATORS).then(
      collaborators => collaborators.filter(collaborator => collaborator.id != id)
    );
  }
}
