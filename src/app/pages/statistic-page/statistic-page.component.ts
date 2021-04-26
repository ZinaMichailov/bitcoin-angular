import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BitcoinService } from 'src/app/services/bitcoin.service';

@Component({
  selector: 'statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticPageComponent implements OnInit {
  marketPrice$: Observable<any>
  confirmedTransactions$: Observable<any>

  constructor(private bitcoinService: BitcoinService) { }

  async ngOnInit(): Promise<void> {
    this.marketPrice$ = await this.bitcoinService.getMarketPrice()
    
    this.confirmedTransactions$ = await this.bitcoinService.getConfirmedTransactions()
    console.log(this.confirmedTransactions$);
  }
}
