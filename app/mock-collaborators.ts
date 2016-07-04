import { Collaborator } from './collaborator';
import { Competence } from './competence';

export var COLLABORATORS: Collaborator[] = [
  new Collaborator(11, 'Mr. Nice', 'toto', true).addCompetence(new Competence("Développement","Java")),
  new Collaborator(12, 'Narco','titi', true),
  new Collaborator(13, 'Bombasto', 'tutu', true),
  new Collaborator(14, 'Celeritas', 'babar', true),
  new Collaborator(15, 'Magneta', 'bibi'),
  new Collaborator(16, 'RubberMan', 'bubu'),
  new Collaborator(17, 'Dynama', 'fifi'),
  new Collaborator(18, 'Dr IQ', 'fafa'),
  new Collaborator(19, 'Magma', 'fufu'),
  new Collaborator(20, 'Tornado', 'vivi')
];
