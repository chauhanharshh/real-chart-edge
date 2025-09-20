import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
}

interface StockWatchlistProps {
  stocks: Stock[];
  onStockSelect: (symbol: string) => void;
}

export const StockWatchlist: React.FC<StockWatchlistProps> = ({ stocks, onStockSelect }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Watchlist</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {stocks.map((stock) => (
            <div
              key={stock.symbol}
              className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer border-b last:border-b-0"
              onClick={() => onStockSelect(stock.symbol)}
            >
              <div className="flex flex-col">
                <span className="font-medium text-sm">{stock.symbol}</span>
                <span className="text-xs text-muted-foreground">{stock.name}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-medium">₹{stock.price.toFixed(2)}</span>
                <div className="flex items-center gap-1">
                  {stock.change >= 0 ? (
                    <ArrowUp className="h-3 w-3 text-success" />
                  ) : (
                    <ArrowDown className="h-3 w-3 text-destructive" />
                  )}
                  <Badge
                    variant={stock.change >= 0 ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {stock.changePercent.toFixed(2)}%
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};