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
  marketPrice
  confirmedTransactions

  constructor(private bitcoinService: BitcoinService) { }

  async ngOnInit(): Promise<void> {
    let res1 = await this.bitcoinService.getMarketPrice()
    res1.subscribe(values => {
      this.marketPrice = [...values]
      
    });
    
    let res = await this.bitcoinService.getConfirmedTransactions()
    res.subscribe(values => {
      this.confirmedTransactions = [...values]
    });
    console.log(this.marketPrice);
    console.log(this.confirmedTransactions);
  }
}
