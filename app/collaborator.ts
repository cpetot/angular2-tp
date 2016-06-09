export class Collaborator {
  id: number;
  name : string;
  surname : string;
  manager : Collaborator;
  image : string = null;

  constructor(id: number, name : string, surname : string, manager? : Collaborator, image? : string) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.manager = manager;
	this.image = image;
  }
}
