// CurrencySymbols.js
class CurrencySymbols {
    constructor() {
        this.symbols = {
            USD: { symbol: '$', position: 'before' },
            EUR: { symbol: '€', position: 'before' },
            RUB: { symbol: '₽', position: 'after' },
            GBP: { symbol: '£', position: 'before' },
            JPY: { symbol: '¥', position: 'before' },
            CNY: { symbol: 'CN¥', position: 'before' },
            AUD: { symbol: 'A$', position: 'before' },
            CAD: { symbol: 'C$', position: 'before' },
            CHF: { symbol: 'CHF', position: 'before' },
            SEK: { symbol: 'kr', position: 'after' },
            NOK: { symbol: 'kr', position: 'after' },
            DKK: { symbol: 'kr', position: 'after' },
            INR: { symbol: '₹', position: 'before' },
            BRL: { symbol: 'R$', position: 'before' },
            ZAR: { symbol: 'R', position: 'before' },
            MXN: { symbol: '$', position: 'before' },
            SGD: { symbol: 'S$', position: 'before' },
            HKD: { symbol: 'HK$', position: 'before' },
            KRW: { symbol: '₩', position: 'before' },
            TRY: { symbol: '₺', position: 'after' },
            NZD: { symbol: 'NZ$', position: 'before' },
            THB: { symbol: '฿', position: 'before' },
            CZK: { symbol: 'Kč', position: 'after' }
        };
    }

    getCurrencySymbol(ticker) {
        return this.symbols[ticker] ? this.symbols[ticker].symbol : 'Unknown currency';
    }

    formatPrice(amount, ticker) {
        const currency = this.symbols[ticker];
        if (!currency) return `Unknown currency ${amount}`;

        const formattedAmount = parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });

        if (currency.position === 'before') {
            return `${currency.symbol}${formattedAmount}`;
        } else {
            return `${formattedAmount}${currency.symbol}`;
        }
    }
}

export default new CurrencySymbols();  // Экспорт экземпляра класса
