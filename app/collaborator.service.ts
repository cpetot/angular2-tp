import { Injectable } from '@angular/core';

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
      collaborators => collaborators.filter(collab => collab.id != collaborator.id
        && collab.isManager && !this.hasThisManagerInHierarchy(collab, collaborator))
      );
  }

  /**
   * Méthode permettant de vérifier qu'un collaborateur n'a pas ce manager dans sa hierarchie
   * Cela nous permet nottament de vérifier si l'on peut mettre un collaborateur en manager sans faire une boucle
  **/
  private hasThisManagerInHierarchy(collaborator : Collaborator, manager : Collaborator) : boolean{
      if(!collaborator) {
        return false;
      } else if(collaborator.manager === manager) {
        return true;
      } else {
        return this.hasThisManagerInHierarchy(collaborator.manager, manager);
      }
    }

  /*
   * Retourne les collaborateurs gérée par le collaborateur en paramètre
  **/
  getManagedCollaborators(collaborator : Collaborator) {
    return Promise.resolve(COLLABORATORS).then(
      collaborators =>
      collaborators.filter(collab => collab.manager && collab.manager.id === collaborator.id)
    );
  }
}
