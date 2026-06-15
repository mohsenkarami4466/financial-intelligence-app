const mockData = {
  assets: [
    { name: 'USD', change: 0.3 },
    { name: 'Gold', change: -1.2 },
    { name: 'Crypto', change: 4.5 },
    { name: 'Stocks', change: -0.8 }
  ],
  keyEvent: "Federal Reserve signals potential rate cut in September, likely boosting gold and crypto.",
  market: [
    { name: 'USD/IRR', trend: 'up', value: 1.2 },
    { name: 'Gold (XAU)', trend: 'down', value: -0.5 },
    { name: 'BTC', trend: 'up', value: 6.8 },
    { name: 'S&P 500', trend: 'down', value: -0.3 }
  ],
  alerts: [
    { type: 'price', message: 'Gold dropped below $1900' },
    { type: 'news', message: 'Crypto regulation news impacting market' },
    { type: 'movement', message: 'USD/IRR moved +3% in 24h' }
  ],
  brief: [
    "Today's market showed mixed signals.",
    "Gold dipped due to strong dollar.",
    "Bitcoin surged on ETF inflow rumors."
  ]
};

export default mockData;