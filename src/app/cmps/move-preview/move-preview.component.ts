import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'move-preview',
  templateUrl: './move-preview.component.html',
  styleUrls: ['./move-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovePreviewComponent implements OnInit {
  @Input() move: any

  constructor() { }

  ngOnInit(): void {
  }

}
