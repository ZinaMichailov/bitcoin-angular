import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoveListComponent implements OnInit {
  @Input() moves: any

  constructor() { }

  ngOnInit(): void {
  }

}
