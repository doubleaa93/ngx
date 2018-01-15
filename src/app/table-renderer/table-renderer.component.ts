import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup } from '@angular/forms/src/model';

import { FormBuilderService } from '../form-builder.service';
import Options from '../options';
import { FormattedLabelPipe } from '../formatted-label.pipe';

@Component({
  selector: 'de-re-crud-table-renderer',
  templateUrl: './table-renderer.component.html',
  styleUrls: ['./table-renderer.component.css']
})
export class TableRendererComponent {
  editor?: FormGroup = null;
  editorSubmitButtonText: string;

  @Input() form: FormArray;
  @Input() struct: any;
  @Input() block: string;
  @Input() collectionBlock: string;
  @Input() options: Options;

  constructor(
    private formBuilder: FormBuilderService,
    private formattedLabelPipe: FormattedLabelPipe) {
  }

  onAddItem() {
    const item = this.formBuilder.createFormGroup(this.struct, this.block);

    this.form.push(item);
    this.editor = item;
    this.editorSubmitButtonText = 'Add ' + this.formattedLabelPipe.transform(this.struct);
  }

  onEditItem(index: number) {
    const item = this.form.at(index) as FormGroup;

    this.editor = item;
    this.editorSubmitButtonText = 'Edit ' + this.formattedLabelPipe.transform(this.struct);
  }

  onRemoveItem(index: number): void {
    this.form.removeAt(index);
  }
}
