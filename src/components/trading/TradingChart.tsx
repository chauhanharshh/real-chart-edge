import React, { useEffect, useRef } from 'react';
import { 
  createChart, 
  ColorType, 
  CrosshairMode, 
  IChartApi,
  SeriesType,
} from 'lightweight-charts';
import { Card } from '@/components/ui/card';

interface CandlestickData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface TradingChartProps {
  data: CandlestickData[];
  symbol: string;
}

export const TradingChart: React.FC<TradingChartProps> = ({ data, symbol }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#333',
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      grid: {
        vertLines: { color: '#f0f0f0' },
        horzLines: { color: '#f0f0f0' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: '#cccccc',
      },
      timeScale: {
        borderColor: '#cccccc',
        timeVisible: true,
      },
    });

    // Use the correct method to add a candlestick series
    const candlestickSeries = chart.addSeries('Candlestick' as any, {
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderDownColor: '#ef4444',
      borderUpColor: '#22c55e',
      wickDownColor: '#ef4444',
      wickUpColor: '#22c55e',
    });

    chartRef.current = chart;

    if (data.length > 0) {
      candlestickSeries.setData(data);
    }

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data]);

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{symbol}</h3>
      </div>
      <div ref={chartContainerRef} className="w-full h-[400px]" />
    </Card>
  );
};