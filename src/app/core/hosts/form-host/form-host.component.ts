import { Component, Input, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IField } from '../../models/schema';
import { FormStateService, FormState } from '../../services/form-state.service';

@Component({
  selector: 'de-re-crud-form-host',
  templateUrl: './form-host.component.html'
})
export class FormHostComponent implements OnInit, OnChanges {
  private _struct: string;
  private _block: string;

  @Input() formId: number;
  @Input() form: FormGroup;
  @Input() fields: IField[];
  state: FormState;

  constructor(
    private stateService: FormStateService
  ) {}

  get struct() {
    return this._struct || this.state.options.struct;
  }

  @Input()
  set struct(value: string) {
    this._struct = value;
  }

  get block() {
    return this._block || this.state.options.block;
  }

  @Input()
  set block(value: string) {
    this._block = value;
  }

  ngOnInit() {
    this.state = this.stateService.get(this.formId);

    let { struct, block } = this.state.options;

    if (this.struct) {
      struct = this.struct;
    }

    if (this.block) {
      block = this.block;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.formId && !changes.formId.isFirstChange()) {
      this.ngOnInit();
      return;
    }

    if (changes.struct && !changes.struct.isFirstChange()) {
      this.ngOnInit();
      return;
    }

    if (changes.block && !changes.block.isFirstChange()) {
      this.ngOnInit();
      return;
    }
  }
}
