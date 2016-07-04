import {Competence} from './competence';

export class Collaborator {
  id: number;
  name : string;
  surname : string;
  manager : Collaborator;
  image : string = null;
  isManager : boolean = false;
  competences: Competence[] = [];

  constructor(id: number, name : string, surname : string, isManager? : boolean, manager? : Collaborator, image? : string) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.manager = manager;
	  this.image = image;
    this.isManager = isManager;
  }

  addCompetence(competence : Competence) : Collaborator {
    this.competences.push(competence);
    return  this;
  }

  isMatch(searchText : string) {
    searchText = searchText.toUpperCase();
    //Si le texte correspond a un nom ou a un prénom, on retourne true
    if(this.name.toUpperCase().indexOf(searchText)!= -1
      || this.surname.toUpperCase().indexOf(searchText)!= -1) {
        return true;
      }

    //Sinon on va regarder parmi les compétences du collaborateur courant
    if(this.competences) {
      for(let comp of this.competences) {
        if(comp) {
          //Si il y a une correspondance, on s'arrête sinon on continue à chercher
          if (comp.type.toUpperCase().indexOf(searchText)!= -1
            || comp.name.toUpperCase().indexOf(searchText)!= -1) {
              return true;
            }
        }
      }
    }
    return false;
  }
}
