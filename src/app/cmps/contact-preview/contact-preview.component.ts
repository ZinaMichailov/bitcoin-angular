import { Component, OnInit, Input, ChangeDetectionStrategy  } from '@angular/core';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactPreviewComponent implements OnInit {
  @Input() contact: Contact

  constructor() { }

  ngOnInit(): void {
  }
}
