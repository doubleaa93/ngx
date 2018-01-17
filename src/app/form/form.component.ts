import { Component, OnInit, OnChanges, OnDestroy, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { cloneDeep } from 'lodash-es';

import { FormBuilderService } from '../form-builder.service';
import Options from '../options';
import { OptionsService } from '../options.service';

@Component({
  selector: 'de-re-crud-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges, OnDestroy {
  private _formChangeSubscription: Subscription;
  private _options: Options;

  structs: any[] = [];
  struct: any;
  form: FormGroup | FormArray;
  error: string = null;

  @Input('struct') structName: string;
  @Input() block: string;
  @Input() collection: boolean;
  @Input() collectionBlock: string;
  @Input() value: any[] | Object;
  @Output() valueChange = new EventEmitter<any>();

  @Input()
  set options(options: Options) {
    this._options = OptionsService.build(options);
  }

  get options() {
    if (!this._options) {
      this._options = OptionsService.build(null);
    }

    return this._options;
  }

  constructor(private formBuilder: FormBuilderService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes.schema && !changes.schema.firstChange) || (changes.structName && !changes.structName.firstChange)) {
      setTimeout(() => {
        this.initialize(false);
      }, 0);
      return;
    }

    if ((changes.value && !changes.value.firstChange) || (changes.collection && !changes.collection.firstChange)) {
      setTimeout(() => {
        this.createForm(true);
      }, 0);
      return;
    }
  }

  ngOnInit(): void {
    this.initialize();
  }

  ngOnDestroy(): void {
    if (!this._formChangeSubscription) {
      this._formChangeSubscription.unsubscribe();
    }
  }

  @Input()
  set schema(json: string | JSON) {
    let parsedAsJson = false;
    if (typeof(json) === 'string') {
      try {
        json = JSON.parse(json as string);
        parsedAsJson = true;
      } catch (e) {
      }
    }

    if (!Array.isArray(json)) {
      this.error = 'Schema is invalid.';
      return;
    }

    let value = json as any[];
    if (!parsedAsJson) {
      value = cloneDeep(value);
    }

    this.error = null;

    this.structs = value.reduce((structMap, struct) => {
      const { fields, blocks } = struct;

      struct.keyFields = [];

      struct.fields = fields.reduce((fieldMap, field) => {
        fieldMap[field.name] = field;
        field.initialValue = field.initialValue === undefined ? '' : field.initialValue;
        return fieldMap;
      }, {});

      struct.blocks = blocks.reduce((blockMap, block) => {
        blockMap[block.name] = block;

        block.fields.forEach((fieldReference, index) => {
          let condition = null;

          if (typeof(fieldReference) === 'string') {
            fieldReference = { field: fieldReference };
          }

          if (fieldReference.condition) {
            const returnValue = fieldReference.condition[0] === '{'
            ? fieldReference
            : `return ${fieldReference.condition}`;

            condition = new Function('value', returnValue);
          } else {
            condition = new Function('return true');
          }

          block.fields[index] = Object.assign({ condition }, struct.fields[fieldReference.field]);
        });

        return blockMap;
      }, {});

      structMap[struct.name] = struct;
      return structMap;
    }, {});

    Object.keys(this.structs).forEach(structName => {
      Object.keys(this.structs[structName].fields).forEach(fieldName => {
        const field = this.structs[structName].fields[fieldName];

        if (field.reference) {
          field.reference = Object.assign({ reference: field.reference }, this.structs[field.reference.name]);
        }

        if (field.keyField) {
          this.structs[structName].keyFields.push(field);
        }
      });

      Object.keys(this.structs[structName].blocks).forEach(blockName => {
        const block = this.structs[structName].blocks[blockName];

        block.fields.forEach(field => {
          if (field.reference) {
            field.reference = Object.assign({ reference: field.reference }, this.structs[field.reference.name]);
          }
        });
      });
    });
  }

  private initialize(updating: boolean = false): void {
    const struct = this.structs[this.structName];
    if (!struct) {
      this.error = 'Struct does not exist';
      return;
    }

    this.error = null;

    if (!this.value) {
      this.value = this.collection
       ? []
       : {};
    }

    this.struct = struct;
    this.createForm(updating);
  }

  private createForm(updating: boolean = false): void {
    this.form = this.collection
    ? this.formBuilder.createFormArray(this.struct, this.block, this.value as any[])
    : this.formBuilder.createFormGroup(this.struct, this.block, this.value);

    if (this._formChangeSubscription) {
      this._formChangeSubscription.unsubscribe();
    }

    this._formChangeSubscription = this.form.valueChanges.subscribe(value => {
      this.valueChange.emit(this.formatValue(this.struct, value));
    });

    if (updating) {
      this.valueChange.emit(this.formatValue(this.struct, this.form.value));
    }
  }

  private formatValue(struct: any, value: Object | any[], parentField?: any) {
    if (Array.isArray(value)) {
      return value.map(item => this.formatValue(struct, item));
    }

    const formattedValue = {};

    Object.keys(value).forEach(key => {
      let item = value[key];

      if (this.isObject(item)) {
        const nestedItem = this.formatValue(struct.fields[key].reference, item);

        if (struct.fields[key].required || !this.isEmptyValue(nestedItem)) {
          formattedValue[key] = nestedItem;
        }

        return;
      }

      if (!struct.fields[key].required && this.isEmptyValue(item)) {
        return;
      }

      switch (struct.fields[key].type) {
        case 'integer':
          item = item * 1;
          break;
      }

      formattedValue[key] = item;
    });

    return formattedValue;
  }

  private isEmptyValue(value: any) {
    if (!value) {
      return true;
    }

    if (Array.isArray(value)) {
      return !value.length;
    }

    if (!this.isObject(value)) {
      return false;
    }

    const keys = Object.keys(value);
    if (!keys.length) {
      return false;
    }

    for (let i = 0; i < keys.length; i++) {
      if (!this.isEmptyValue(value[keys[i]])) {
        return false;
      }
    }

    return true;
  }

  private isObject(value: any) {
    return typeof(value) === 'object';
  }
}
