import axios from 'axios';
import { storageService } from './storage.service.js';
import { Injectable } from '@angular/core';

const Rate_KEY = 'RateDB';
const MarketPrice_KEY = 'MarketPriceDB';
const TradeVolume_KEY = 'TradeVolumeDB';

@Injectable({
    providedIn: 'root'
})
export class BitcoinService {
    async getRate(coins) {
        let rate = storageService.load(Rate_KEY);
        if (rate) return Promise.resolve(rate);
        const { data } = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=1`);
        rate = coins / data;
        storageService.store(Rate_KEY, rate);
        return rate;
    }

    async getMarketPrice() {
        let marketPrice = storageService.load(MarketPrice_KEY);
        if (marketPrice) return Promise.resolve(marketPrice);
        marketPrice = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`)
        storageService.store(MarketPrice_KEY, marketPrice.data)
        return marketPrice.data;
    }
    
    async getConfirmedTransactions() {
        let tradeVolume = storageService.load(TradeVolume_KEY);
        if (tradeVolume) return Promise.resolve(tradeVolume);
        tradeVolume = await axios.get(`https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true`)
        storageService.store(TradeVolume_KEY, tradeVolume.data)
        return tradeVolume.data;
    
    }
}




