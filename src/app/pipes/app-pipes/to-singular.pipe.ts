import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toSingular',
})
export class ToSingularPipe implements PipeTransform {
  // Just a simple pipe to convert plural form to singular form.
  // Not all cases are considered
  transform(value: string): string {
    if (value[value.length - 1] !== 's') {
      return value;
    }

    // if (value[value.length - 2] === 'e') {
    //   return value.substring(0, value.length - 3);
    // }
    // return value.substring(0, value.length - 2);
    return value.substring(0, value.length - 1);
  }
}
