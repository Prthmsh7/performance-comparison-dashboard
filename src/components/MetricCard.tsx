import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { CompilerMetric } from '../data/dummyData';

interface MetricCardProps {
  metric: CompilerMetric;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const percentChange = ((metric.after - metric.before) / metric.before) * 100;
  const isImproved = 
    (metric.name.includes('Time') || metric.name.includes('Usage') || metric.name.includes('Size')) 
      ? percentChange < 0 
      : percentChange > 0;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {metric.name}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
            {metric.after}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            {metric.unit}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Previous: {metric.before} {metric.unit}
          </Typography>
          
          <Chip
            icon={isImproved ? <ArrowDownward fontSize="small" /> : <ArrowUpward fontSize="small" />}
            label={`${Math.abs(percentChange).toFixed(1)}%`}
            size="small"
            color={isImproved ? 'success' : 'error'}
            sx={{ 
              fontWeight: 'bold',
              '& .MuiChip-icon': {
                color: 'inherit',
              }
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MetricCard; 