import {Pipe, PipeTransform} from '@angular/core';

// Tell Angular2 we're creating a Pipe with TypeScript decorators
@Pipe({
  name: 'CollaboratorsPipe'
})
export class CollaboratorsPipe implements PipeTransform {

  // Transform is the new "return function(value, args)" in Angular 1.x
  transform(value, searchText : String) {

    if(value && searchText) {
      return value.filter(collaborator =>  collaborator.isMatch(searchText) );
    } else {
      return value;
    }
  }
}
