import { Pipe, PipeTransform } from '@angular/core';
import { Techology } from '../types';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {
  transform(value: any[] | null | undefined , property: string, separator: string = ', '): string {
    if (!value || value.length === 0) {
      return '';
    }
    const values = value.map(item => item[property]);
    return values.join(separator);
  }

}
