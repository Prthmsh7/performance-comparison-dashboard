import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { CompilerMetric } from '../data/dummyData';

interface ComparisonChartProps {
  title: string;
  metrics: CompilerMetric[];
  height?: number;
}

/**
 * A bar chart component that compares before and after values for compiler metrics.
 * Used to visualize the impact of changes on performance metrics.
 */
const ComparisonChart: React.FC<ComparisonChartProps> = ({ 
  title, 
  metrics, 
  height = 400 
}) => {
  const theme = useTheme();
  
  // Transform the metrics data for the chart
  const chartData = metrics.map(metric => ({
    name: metric.name,
    before: metric.before,
    after: metric.after,
    unit: metric.unit,
  }));

  // Custom tooltip to show values with appropriate units
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const unit = payload[0].payload.unit;
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
              {`${entry.name}: ${entry.value} ${unit}`}
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
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {/* Responsive chart container */}
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={30}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {/* Before values bar */}
            <Bar 
              dataKey="before" 
              name="Before" 
              fill="#8884d8" 
              radius={[4, 4, 0, 0]}
            />
            {/* After values bar */}
            <Bar 
              dataKey="after" 
              name="After" 
              fill="#82ca9d" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ComparisonChart; 