import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface TechnicalIndicator {
  name: string;
  value: number;
  signal: 'BUY' | 'SELL' | 'HOLD';
  description: string;
}

interface TechnicalIndicatorsProps {
  indicators: TechnicalIndicator[];
}

export const TechnicalIndicators: React.FC<TechnicalIndicatorsProps> = ({ indicators }) => {
  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'BUY':
        return 'bg-success text-success-foreground';
      case 'SELL':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Technical Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {indicators.map((indicator, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{indicator.name}</span>
                  <Badge className={`text-xs ${getSignalColor(indicator.signal)}`}>
                    {indicator.signal}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{indicator.description}</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Value: {indicator.value.toFixed(2)}</span>
                    <span>{Math.round((indicator.value / 100) * 100)}%</span>
                  </div>
                  <Progress value={Math.min(indicator.value, 100)} className="h-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};