import { Pipe, PipeTransform } from '@angular/core';
import { Techology } from '../types';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {

  transform(value: Techology[] | null | undefined , seperator: string = ', '): string {
    if (!value || value.length === 0) {
      
      return '';
    }
    const techNames = value.map(item => item.technologyName);
    return techNames.join(seperator)

  }

}
