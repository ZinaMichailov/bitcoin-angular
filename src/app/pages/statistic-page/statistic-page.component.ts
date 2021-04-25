import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BitcoinService } from 'src/app/services/bitcoin.service';

@Component({
  selector: 'statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticPageComponent implements OnInit {
  marketPrice: Promise<Array<object>>
  confirmedTransactions: Promise<Array<object>>

  constructor(private bitcoinService: BitcoinService) { }

  ngOnInit(): void {
    this.marketPrice = this.bitcoinService.getMarketPrice()
    this.confirmedTransactions = this.bitcoinService.getConfirmedTransactions()
  }
}
