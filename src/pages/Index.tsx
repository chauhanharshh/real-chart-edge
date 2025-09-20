import React, { useState } from 'react';
import { TradingChart } from '@/components/trading/TradingChart';
import { StockWatchlist } from '@/components/trading/StockWatchlist';
import { MarketOverview } from '@/components/trading/MarketOverview';
import { TechnicalIndicators } from '@/components/trading/TechnicalIndicators';
import { PatternRecognition } from '@/components/trading/PatternRecognition';
import { useStockData } from '@/hooks/useStockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Activity, BarChart3, TrendingUp, Brain } from 'lucide-react';

const Index = () => {
  const [selectedStock, setSelectedStock] = useState('RELIANCE');
  const { candlestickData, stocks, indices, technicalIndicators, patterns, loading } = useStockData(selectedStock);

  const handleStockSelect = (symbol: string) => {
    setSelectedStock(symbol);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Stock Market Analyzer</h1>
              <p className="text-muted-foreground">Real-time analysis and pattern recognition</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-primary/10">
            Live Market Data
          </Badge>
        </div>
      </header>

      <div className="mb-6">
        <MarketOverview indices={indices} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <StockWatchlist stocks={stocks} onStockSelect={handleStockSelect} />
        </div>

        <div className="lg:col-span-3">
          <Tabs defaultValue="chart" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="chart" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Chart
              </TabsTrigger>
              <TabsTrigger value="analysis" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Technical
              </TabsTrigger>
              <TabsTrigger value="patterns" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Patterns
              </TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
            </TabsList>

            <TabsContent value="chart" className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center h-[400px] bg-card rounded-lg border">
                  <div className="text-center">
                    <Activity className="h-8 w-8 animate-pulse mx-auto mb-2 text-primary" />
                    <p className="text-muted-foreground">Loading chart data...</p>
                  </div>
                </div>
              ) : (
                <TradingChart data={candlestickData} symbol={selectedStock} />
              )}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              <TechnicalIndicators indicators={technicalIndicators} />
            </TabsContent>

            <TabsContent value="patterns" className="space-y-4">
              <PatternRecognition patterns={patterns} />
            </TabsContent>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TechnicalIndicators indicators={technicalIndicators} />
                <PatternRecognition patterns={patterns} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
