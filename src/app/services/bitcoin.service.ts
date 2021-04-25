import axios from 'axios';
import { storageService } from './storage.service.js';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class BitcoinService {
    Rate_KEY = 'RateDB';
    Market_Price_KEY = 'MarketPriceDB';
    Confirmed_Transactions_KEY = 'ConfirmedTransactionsDB';

    async getRate(coins) {
        let rate = storageService.load(this.Rate_KEY);
        if (rate) return Promise.resolve(rate);
        const { data } = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=1`);
        rate = coins * data;
        storageService.store(this.Rate_KEY, rate);
        return rate;
    }

    async getMarketPrice() {
        let marketPrice = storageService.load(this.Market_Price_KEY);
        if (marketPrice) return Promise.resolve(marketPrice);
        const { data } = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`)
        const values = data.values.map(({x, y}) => {
            return [(new Date(x * 1000).toLocaleDateString('en-US')), y]
        })

        storageService.store(this.Market_Price_KEY, values)
        return values;
    }

    async getConfirmedTransactions() {
        let confirmedTransactions = storageService.load(this.Confirmed_Transactions_KEY);
        if (confirmedTransactions) return Promise.resolve(confirmedTransactions);
        const { data } = await axios.get(`https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true`)
        const values = data.values.map(({x, y}) => {
            return [(new Date(x * 1000).toLocaleDateString('en-US')), y]
        })
        storageService.store(this.Confirmed_Transactions_KEY, values)
        return values;
    }
}




