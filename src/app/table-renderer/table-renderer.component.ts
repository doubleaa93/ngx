import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

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
  editorIndex?: number = null;

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

    this.editor = item;
    this.editorIndex = null;
    this.editorSubmitButtonText = 'Add ' + this.formattedLabelPipe.transform(this.struct);
  }

  onEditItem(index: number) {
    const item = this.form.at(index) as FormGroup;

    this.editor = this.formBuilder.createFormGroup(this.struct, this.block, item.value);
    this.editorIndex = index;
    this.editorSubmitButtonText = 'Update ' + this.formattedLabelPipe.transform(this.struct);
  }

  onRemoveItem(index: number): void {
    this.form.removeAt(index);
  }

  onCloseEditor(submitted: boolean) {
    // TODO: Add public API for supporting alerts
    if (!submitted) {
      if (!confirm('All values will be discarded. Are you sure you want to proceed?')) {
        return;
      }
    } else {
      if (this.editorIndex == null) {
        this.form.push(this.editor);
      } else {
        const item = this.form.at(this.editorIndex) as FormGroup;
        item.setValue(this.editor.value);
      }
    }

    this.editor = null;
    this.editorIndex = null;
  }
}
