import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

interface MarketOverviewProps {
  indices: MarketIndex[];
}

export const MarketOverview: React.FC<MarketOverviewProps> = ({ indices }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {indices.map((index) => (
        <Card key={index.name}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" />
              {index.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{index.value.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-1">
                  {index.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-success" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  )}
                  <span className={`text-sm font-medium ${
                    index.change >= 0 ? 'text-success' : 'text-destructive'
                  }`}>
                    {index.change > 0 ? '+' : ''}{index.change.toFixed(2)}
                  </span>
                  <Badge
                    variant={index.change >= 0 ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {index.changePercent.toFixed(2)}%
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};