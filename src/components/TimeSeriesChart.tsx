import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  ToggleButtonGroup, 
  ToggleButton,
  useTheme
} from '@mui/material';
import { TimeSeriesData } from '../data/dummyData';

interface TimeSeriesChartProps {
  title: string;
  data: TimeSeriesData[];
  height?: number;
}

// Types for the metrics we can display
type MetricKey = 'compilationTime' | 'memoryUsage' | 'cpuUsage';

// Configuration for each metric
interface MetricConfig {
  key: MetricKey;
  name: string;
  color: string;
  unit: string;
}

/**
 * A time series chart component that displays historical performance data.
 * Allows toggling between different metrics (compilation time, memory usage, CPU usage).
 */
const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ 
  title, 
  data, 
  height = 400 
}) => {
  const theme = useTheme();
  // State to track which metric is currently selected
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>('compilationTime');

  // Available metrics with their display properties
  const metrics: MetricConfig[] = [
    { key: 'compilationTime', name: 'Compilation Time', color: '#8884d8', unit: 'seconds' },
    { key: 'memoryUsage', name: 'Memory Usage', color: '#82ca9d', unit: 'MB' },
    { key: 'cpuUsage', name: 'CPU Usage', color: '#ffc658', unit: '%' },
  ];

  // Get the currently selected metric configuration
  const currentMetric = metrics.find(m => m.key === selectedMetric)!;

  // Handle metric selection change
  const handleMetricChange = (
    event: React.MouseEvent<HTMLElement>,
    newMetric: MetricKey | null,
  ) => {
    event.stopPropagation();
    if (newMetric !== null) {
      setSelectedMetric(newMetric);
    }
  };

  // Get the latest value for the reference line
  const latestValue = data[data.length - 1][selectedMetric];

  // Custom tooltip component for better data display
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            p: 1,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <Typography variant="subtitle2">{label}</Typography>
          {payload.map((entry: any, index: number) => (
            <Typography 
              key={`tooltip-${index}`} 
              variant="body2" 
              sx={{ 
                color: entry.color,
                fontWeight: 'bold',
              }}
            >
              {`${entry.name}: ${entry.value} ${currentMetric.unit}`}
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardContent>
        {/* Header with title and metric selector */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            {title}
          </Typography>
          <ToggleButtonGroup
            value={selectedMetric}
            exclusive
            onChange={handleMetricChange}
            size="small"
          >
            {metrics.map((metric) => (
              <ToggleButton key={metric.key} value={metric.key}>
                {metric.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
        {/* Chart container */}
        <ResponsiveContainer width="100%" height={height}>
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {/* Reference line showing the current value */}
            <ReferenceLine 
              y={latestValue} 
              stroke="red" 
              strokeDasharray="3 3" 
              label={{ 
                value: `Current: ${latestValue} ${currentMetric.unit}`, 
                position: 'insideBottomRight',
                fill: 'red',
                fontSize: 12
              }} 
            />
            <Line
              type="monotone"
              dataKey={selectedMetric}
              name={currentMetric.name}
              stroke={currentMetric.color}
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TimeSeriesChart; 