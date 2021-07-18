import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit {
  @Input() title
  @Input() data
  @Input() columnNames
  @Input() vTitle

  options = {
    colors: ['#8dd6e9'],
    backgroundColor: 'transparent',
    hAxis: {
      title: 'Date'
    },
    vAxis: {
      title: ''
    },
    legend: 'left'
  }
  type = 'AreaChart'
  width = screen.width * 0.95
  height = screen.width * 0.4
  constructor() { }

  ngOnInit(): void {
    this.options.vAxis.title = this.vTitle
  }

}
