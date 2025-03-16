import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import MetricCard from '../components/MetricCard';
import ComparisonChart from '../components/ComparisonChart';
import TimeSeriesChart from '../components/TimeSeriesChart';
import { compilerMetrics, timeSeriesData } from '../data/dummyData';

/**
 * Dashboard page component that provides an overview of compiler performance metrics.
 * Shows key metrics, comparison charts, and historical performance data.
 */
const Dashboard: React.FC = () => {
  return (
    <Box>
      {/* Page header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Compiler Performance Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Overview of key performance metrics before and after the latest changes.
          This dashboard helps you track improvements and identify potential regressions.
        </Typography>
      </Box>

      {/* Metric cards section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {compilerMetrics.map((metric) => (
          <Grid item xs={12} sm={6} md={4} key={metric.name}>
            <MetricCard metric={metric} />
          </Grid>
        ))}
      </Grid>

      {/* Charts section */}
      <Grid container spacing={3}>
        {/* Performance comparison chart */}
        <Grid item xs={12} md={6}>
          <ComparisonChart 
            title="Performance Comparison" 
            metrics={compilerMetrics.slice(0, 3)} 
          />
        </Grid>
        {/* Historical performance chart */}
        <Grid item xs={12} md={6}>
          <TimeSeriesChart 
            title="Historical Performance" 
            data={timeSeriesData} 
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 