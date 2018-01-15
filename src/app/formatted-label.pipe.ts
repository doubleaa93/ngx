import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formattedLabel'
})
export class FormattedLabelPipe implements PipeTransform {

  transform(labeledModel: any, collection: boolean = false): string {
    let value = (collection && labeledModel.collectionLabel) || labeledModel.label;

    if (!value && labeledModel.name) {
      value = labeledModel.name.replace( /([A-Z])/g, ' $1' );
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }

    if (typeof(value) === 'string') {
      value = { short: value, medium: value, long: value };
    }

    if (!value || !value.short) {
      return null;
    }

    return value.short;
  }
}
