import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import Options from '../options';

@Component({
  selector: 'de-re-crud-block-renderer',
  templateUrl: './block-renderer.component.html',
  styleUrls: ['./block-renderer.component.css']
})
export class BlockRendererComponent implements OnInit {
  block: any;
  availableBlocks: string;

  @Input() form: FormGroup;
  @Input() struct: any;
  @Input('block') blockName: string;
  @Input() options: Options;
  @Output() addItem = new EventEmitter<any>();
  @Output() removeItem = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.block = this.struct.blocks[this.blockName];
    this.availableBlocks = Object.keys(this.struct.blocks).map(blockName => this.struct.blocks[blockName].name).join(',');
  }
}
