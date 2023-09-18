import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'words',
})
export class WordsPipe implements PipeTransform {
  transform(value: string): string {
    if (value === '') {
      return value;
    }

    let result = value[0].toUpperCase();

    for (let i = 1; i < value.length; i++) {
      const cur = value[i];
      if (cur >= 'A' && cur <= 'Z') {
        result += ` ${cur.toLowerCase()}`;
      } else {
        result += cur;
      }
    }

    return result;
  }
}
