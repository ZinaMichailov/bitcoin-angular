import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferFundComponent implements OnInit {
  @Input() contact: Contact
  @Output() onTransfer = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }
}
