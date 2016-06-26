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
}
