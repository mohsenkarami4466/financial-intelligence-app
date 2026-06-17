const mockData = {
  assets: [
    { id: 'usd', name: 'USD/IRR', type: 'currency', price: 595000, change: 2.3, history: [590000, 592000, 595000] },
    { id: 'gold', name: 'Gold (XAU)', type: 'commodity', price: 2320, change: -0.8, history: [2340, 2330, 2320] },
    { id: 'btc', name: 'Bitcoin', type: 'crypto', price: 67500, change: 5.1, history: [64000, 66000, 67500] },
    { id: 'sp500', name: 'S&P 500', type: 'stock', price: 5320, change: 0.4, history: [5300, 5310, 5320] },
    { id: 'eth', name: 'Ethereum', type: 'crypto', price: 3450, change: -2.1, history: [3520, 3480, 3450] },
    { id: 'oil', name: 'Crude Oil', type: 'commodity', price: 78.5, change: 1.8, history: [77.0, 77.8, 78.5] },
  ],
  market: [
    { name: 'USD/IRR', trend: 'up', value: 2.3 },
    { name: 'Gold (XAU)', trend: 'down', value: -0.8 },
    { name: 'Bitcoin', trend: 'up', value: 5.1 },
    { name: 'S&P 500', trend: 'up', value: 0.4 },
    { name: 'Ethereum', trend: 'down', value: -2.1 },
    { name: 'Crude Oil', trend: 'up', value: 1.8 },
  ],
  keyEvent: {
    title: 'Federal Reserve Signals Rate Pause',
    summary: 'The Fed indicated it may hold rates steady in September, boosting gold and crypto while pressuring the dollar.',
    affectedAssets: ['Gold', 'Bitcoin', 'USD/IRR'],
  },
  alerts: [
    { id: 1, type: 'price', assetId: 'gold', condition: 'below', value: 2300, active: true, message: 'Gold below $2300' },
    { id: 2, type: 'price', assetId: 'btc', condition: 'above', value: 70000, active: false, message: 'Bitcoin above $70000' },
    { id: 3, type: 'percent', assetId: 'usd', condition: 'change_above', value: 3, active: true, message: 'USD/IRR moved +3%' },
  ],
  brief: [
    { text: 'Global markets mixed as Fed decision looms.', relatedAssets: [] },
    { text: 'Gold dips on stronger dollar but remains above $2300 support.', relatedAssets: ['Gold'] },
    { text: 'Bitcoin surges on ETF inflow speculation.', relatedAssets: ['Bitcoin'] },
    { text: 'Oil prices climb amid supply concerns.', relatedAssets: ['Crude Oil'] },
  ],
};

export default mockData;