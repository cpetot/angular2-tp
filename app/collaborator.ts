export class Collaborator {
  id: number;
  name : string;
  surname : string;
  manager : Collaborator;

  constructor(id: number, name : string, surname : string, manager? : Collaborator) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.manager = manager;
  }
}
