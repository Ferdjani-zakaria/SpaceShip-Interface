export default interface Market {
    data: {
      symbol: string;
      exports: TradeGood[];
      imports: TradeGood[];
      exchange: TradeGood[];
      transactions: Transaction[];
      tradeGoods: TradeGoodDetail[];
    };
  }
  
  interface TradeGood {
    symbol: string;
    name: string;
    description: string;
  }
  
  interface Transaction {
    waypointSymbol: string;
    shipSymbol: string;
    tradeSymbol: string;
    type: "PURCHASE" | "SELL";
    units: number;
    pricePerUnit: number;
    totalPrice: number;
    timestamp: string; // ISO date string
  }
  
  interface TradeGoodDetail {
    symbol: string;
    type: "EXPORT" | "IMPORT" | "EXCHANGE";
    tradeVolume: number;
    supply: "SCARCE" | "PLENTIFUL";
    activity: "WEAK" | "STRONG";
    purchasePrice: number;
    sellPrice: number;
  }