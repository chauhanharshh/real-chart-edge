import { useState, useEffect } from 'react';

// Finnhub API configuration
const FINNHUB_API_KEY = 'd37ecf1r01qskrefrccgd37ecf1r01qskrefrcd0';
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

export interface CandlestickData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface TechnicalIndicator {
  name: string;
  value: number;
  signal: 'BUY' | 'SELL' | 'HOLD';
  description: string;
}

export interface ChartPattern {
  name: string;
  type: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  confidence: number;
  description: string;
  timeframe: string;
}

// API Functions
const fetchStockQuote = async (symbol: string) => {
  try {
    const response = await fetch(`${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    return null;
  }
};

const fetchCandlestickData = async (symbol: string, days: number = 30) => {
  try {
    const to = Math.floor(Date.now() / 1000);
    const from = to - (days * 24 * 60 * 60);
    
    const response = await fetch(
      `${FINNHUB_BASE_URL}/stock/candle?symbol=${symbol}&resolution=D&from=${from}&to=${to}&token=${FINNHUB_API_KEY}`
    );
    const data = await response.json();
    
    if (data.s === 'ok') {
      return data.c.map((close: number, index: number) => ({
        time: new Date(data.t[index] * 1000).toISOString().split('T')[0],
        open: Number(data.o[index].toFixed(2)),
        high: Number(data.h[index].toFixed(2)),
        low: Number(data.l[index].toFixed(2)),
        close: Number(close.toFixed(2)),
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching candlestick data:', error);
    return [];
  }
};

// Fallback data generator for when API fails
const generateFallbackData = (days: number = 100): CandlestickData[] => {
  const data: CandlestickData[] = [];
  let price = 1000 + Math.random() * 500;
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    const open = price;
    const change = (Math.random() - 0.5) * 20;
    const close = Math.max(50, open + change);
    const high = Math.max(open, close) + Math.random() * 10;
    const low = Math.min(open, close) - Math.random() * 10;
    
    data.push({
      time: date.toISOString().split('T')[0],
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
    });
    
    price = close;
  }
  
  return data;
};

const mockStocks: Stock[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2456.75, change: 23.45, changePercent: 0.96, volume: '2.3M' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3842.30, change: -15.20, changePercent: -0.39, volume: '1.8M' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1687.90, change: 8.45, changePercent: 0.50, volume: '3.1M' },
  { symbol: 'INFY', name: 'Infosys Limited', price: 1456.25, change: -7.85, changePercent: -0.54, volume: '2.7M' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1034.60, change: 12.30, changePercent: 1.20, volume: '4.2M' },
];

const mockIndices: MarketIndex[] = [
  { name: 'NIFTY 50', value: 19543.20, change: 123.45, changePercent: 0.64 },
  { name: 'SENSEX', value: 65432.18, change: -87.23, changePercent: -0.13 },
  { name: 'BANK NIFTY', value: 44234.75, change: 234.67, changePercent: 0.53 },
];

const mockTechnicalIndicators: TechnicalIndicator[] = [
  { name: 'RSI (14)', value: 67.5, signal: 'HOLD', description: 'Relative Strength Index indicates neutral momentum' },
  { name: 'MACD', value: 23.4, signal: 'BUY', description: 'Moving Average Convergence Divergence shows bullish crossover' },
  { name: 'Bollinger Bands', value: 45.8, signal: 'SELL', description: 'Price near upper band, potential reversal' },
  { name: 'Stochastic', value: 78.2, signal: 'SELL', description: 'Overbought conditions detected' },
];

const mockPatterns: ChartPattern[] = [
  {
    name: 'Ascending Triangle',
    type: 'BULLISH',
    confidence: 78,
    description: 'Bullish continuation pattern with higher lows and resistance level',
    timeframe: '1D'
  },
  {
    name: 'Head and Shoulders',
    type: 'BEARISH',
    confidence: 65,
    description: 'Reversal pattern suggesting potential downward movement',
    timeframe: '4H'
  },
  {
    name: 'Double Bottom',
    type: 'BULLISH',
    confidence: 82,
    description: 'Strong reversal pattern with support level confirmation',
    timeframe: '1D'
  }
];

export const useStockData = (symbol: string = 'AAPL') => {
  const [candlestickData, setCandlestickData] = useState<CandlestickData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Try to fetch real data from Finnhub API
        const data = await fetchCandlestickData(symbol);
        
        if (data && data.length > 0) {
          setCandlestickData(data);
        } else {
          // Fallback to mock data if API fails
          setCandlestickData(generateFallbackData());
        }
      } catch (error) {
        console.error('Failed to fetch stock data:', error);
        // Use fallback data on error
        setCandlestickData(generateFallbackData());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  return {
    candlestickData,
    stocks: mockStocks,
    indices: mockIndices,
    technicalIndicators: mockTechnicalIndicators,
    patterns: mockPatterns,
    loading,
  };
};