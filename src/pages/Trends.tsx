import React from 'react';
import { Grid, Typography, Box, Card, CardContent, useTheme } from '@mui/material';
import TimeSeriesChart from '../components/TimeSeriesChart';
import { timeSeriesData } from '../data/dummyData';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const Trends: React.FC = () => {
  const theme = useTheme();
  
  // Calculate month-over-month improvements
  const calculateImprovements = () => {
    const improvements = [];
    for (let i = 1; i < timeSeriesData.length; i++) {
      const current = timeSeriesData[i];
      const previous = timeSeriesData[i - 1];
      
      const compilationImprovement = 
        ((previous.compilationTime - current.compilationTime) / previous.compilationTime) * 100;
      const memoryImprovement = 
        ((previous.memoryUsage - current.memoryUsage) / previous.memoryUsage) * 100;
      const cpuImprovement = 
        ((previous.cpuUsage - current.cpuUsage) / previous.cpuUsage) * 100;
      
      improvements.push({
        date: current.date,
        compilationImprovement: parseFloat(compilationImprovement.toFixed(2)),
        memoryImprovement: parseFloat(memoryImprovement.toFixed(2)),
        cpuImprovement: parseFloat(cpuImprovement.toFixed(2)),
      });
    }
    return improvements;
  };

  const improvementsData = calculateImprovements();

  // Custom tooltip for the improvements chart
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
              {`${entry.name}: ${entry.value > 0 ? '+' : ''}${entry.value}%`}
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Performance Trends
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Historical performance data and month-over-month improvements.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TimeSeriesChart 
            title="Historical Performance Metrics" 
            data={timeSeriesData} 
            height={400}
          />
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Month-over-Month Improvements
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                  data={improvementsData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis 
                    label={{ 
                      value: 'Improvement (%)', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { textAnchor: 'middle' }
                    }} 
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="compilationImprovement"
                    name="Compilation Time"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                    activeDot={{ r: 8 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="memoryImprovement"
                    name="Memory Usage"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.3}
                    activeDot={{ r: 8 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="cpuImprovement"
                    name="CPU Usage"
                    stroke="#ffc658"
                    fill="#ffc658"
                    fillOpacity={0.3}
                    activeDot={{ r: 8 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Trends; 