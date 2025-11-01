function maxProfit(prices: number[]): number {
    let maxProfit: number[] = [];

    for (let i = 0; i < prices.length-1; i++) {
        if(prices[i]<prices[i+1]){
            maxProfit.push(prices[i+1] - prices[i]);
        }
    }

    let sum = 0;

    for (let i = 0; i < maxProfit.length; i++) {
        sum += maxProfit[i];
    }

    return sum;
};
