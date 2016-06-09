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

  /**
   *  Récupération des managers possible pour le collaborateur en paramètre
  **/
  getAvailableManagers(collaborator : Collaborator) {
    return Promise.resolve(COLLABORATORS).then(
      collaborators => collaborators.filter(collab => collab.id != collaborator.id)
    );
  }
}
