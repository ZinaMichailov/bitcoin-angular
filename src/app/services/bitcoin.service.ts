import axios from 'axios';
import { storageService } from './storage.service.js';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BitcoinService {
    Rate_KEY = 'RateDB';
    Market_Price_KEY = 'MarketPriceDB';
    Confirmed_Transactions_KEY = 'ConfirmedTransactionsDB';

    constructor(private http: HttpClient) { }

    async getRate(coins) {
        let rate = storageService.load(this.Rate_KEY);
        if (rate) return of(rate);

        return this.http.get<any>('https://blockchain.info/tobtc?currency=USD&value=1')
            .pipe(
                map(res => {
                    const rate = coins * res;
                    rate.toFixed(6)
                    storageService.store(this.Rate_KEY, rate);
                    return rate
                })
            )

        // const { data } = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=1`);
        // rate = coins * data;
        // storageService.store(this.Rate_KEY, rate);
        // return rate;
    }

    async getMarketPrice() {
        let marketPrice = storageService.load(this.Market_Price_KEY)
        if (marketPrice && marketPrice?.length) return of(marketPrice)

        return this.http.get<any>('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
            .pipe(
                map(res => res.values.map(
                    ({ x, y }) => {
                        return [(new Date(x * 1000).toLocaleDateString('en-US')), y]
                    }
                )),
                tap(values => storageService.store(this.Market_Price_KEY, values))
            )
        // const { data } = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`)
        // const values = data.values.map(({x, y}) => {
        //     return [(new Date(x * 1000).toLocaleDateString('en-US')), y]
        // })

        // storageService.store(this.Market_Price_KEY, values)
        // return values;
    }

    async getConfirmedTransactions() {
        let confirmedTransactions = storageService.load(this.Confirmed_Transactions_KEY)
        if (confirmedTransactions && confirmedTransactions?.length) return of(confirmedTransactions)

        return this.http.get<any>('https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true')
            .pipe(
                map(res => res.values.map(
                    ({ x, y }) => {                        
                        return [(new Date(x * 1000).toLocaleDateString('en-US')), y]
                    }
                )),
                tap(values => storageService.store(this.Confirmed_Transactions_KEY, values))
            )
        // const { data } = await axios.get(`https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true`)
        // const values = data.values.map(({ x, y }) => {
        //     return [(new Date(x * 1000).toLocaleDateString('en-US')), y]
        // })
        // storageService.store(this.Confirmed_Transactions_KEY, values)
        // return values;
    }
}




