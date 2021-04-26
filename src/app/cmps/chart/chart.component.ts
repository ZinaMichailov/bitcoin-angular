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
    colors: ['#008e9b'],
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
  width = screen.width * 0.8
  height = screen.width * 0.4

  constructor() { }

  ngOnInit(): void {
    this.options.vAxis.title = this.vTitle
    console.log('data chart:', this.data);
    
  }

}
