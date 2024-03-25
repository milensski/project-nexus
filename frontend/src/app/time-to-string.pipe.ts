import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeToString'
})
export class TimeToStringPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    console.log()
    return value;
  }

}
