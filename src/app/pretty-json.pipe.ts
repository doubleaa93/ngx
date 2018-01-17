import { Pipe, PipeTransform } from '@angular/core';
import * as Prism from 'prismjs';

@Pipe({
  name: 'prettyJson'
})
export class PrettyJsonPipe implements PipeTransform {
  transform(value: JSON, args?: any): string {
    if (!value) {
      return null;
    }

    return Prism.highlight(JSON.stringify(value, null, 2), Prism.languages.javascript);
  }
}
