import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ChartPattern {
  name: string;
  type: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  confidence: number;
  description: string;
  timeframe: string;
}

interface PatternRecognitionProps {
  patterns: ChartPattern[];
}

export const PatternRecognition: React.FC<PatternRecognitionProps> = ({ patterns }) => {
  const getPatternIcon = (type: string) => {
    switch (type) {
      case 'BULLISH':
        return <TrendingUp className="h-4 w-4 text-success" />;
      case 'BEARISH':
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getPatternColor = (type: string) => {
    switch (type) {
      case 'BULLISH':
        return 'bg-success/10 text-success border-success/20';
      case 'BEARISH':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Pattern Recognition</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {patterns.map((pattern, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getPatternIcon(pattern.type)}
                  <span className="font-medium">{pattern.name}</span>
                </div>
                <Badge className={`text-xs ${getPatternColor(pattern.type)}`}>
                  {pattern.type}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{pattern.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Timeframe: {pattern.timeframe}</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Confidence:</span>
                  <Badge variant={pattern.confidence > 70 ? "default" : "secondary"}>
                    {pattern.confidence}%
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