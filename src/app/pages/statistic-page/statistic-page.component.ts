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
  marketPrice$
  confirmedTransactions

  constructor(private bitcoinService: BitcoinService) { }

  async ngOnInit(): Promise<void> {
    this.marketPrice$ = await this.bitcoinService.getMarketPrice()
    
    let res = await this.bitcoinService.getConfirmedTransactions()
    res.subscribe(values => {
      
      this.confirmedTransactions = [...values]
      console.log(this.confirmedTransactions);
    });
  }
}
