import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Grid,
  LinearProgress,
  Avatar,
  Divider,
} from '@mui/material';
import { PRData } from '../data/dummyData';

interface PRCardProps {
  pr: PRData;
}

const PRCard: React.FC<PRCardProps> = ({ pr }) => {
  const getStatusChip = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Chip 
            label="Approved" 
            size="small" 
            color="success" 
            sx={{ fontWeight: 'bold' }} 
          />
        );
      case 'rejected':
        return (
          <Chip 
            label="Rejected" 
            size="small" 
            color="error" 
            sx={{ fontWeight: 'bold' }} 
          />
        );
      case 'pending':
        return (
          <Chip 
            label="Pending" 
            size="small" 
            color="warning" 
            sx={{ fontWeight: 'bold' }} 
          />
        );
      default:
        return null;
    }
  };

  const testPassRate = (pr.metrics.testsPassed / pr.metrics.testsTotal) * 100;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" component="div" gutterBottom noWrap sx={{ maxWidth: 250 }}>
              PR #{pr.id}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {pr.date}
            </Typography>
          </Box>
          {getStatusChip(pr.status)}
        </Box>
        
        <Typography variant="body1" gutterBottom sx={{ fontWeight: 500, mb: 2 }}>
          {pr.title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            sx={{ 
              width: 32, 
              height: 32, 
              bgcolor: 'primary.main',
              fontSize: '0.875rem',
            }}
          >
            {pr.author.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="body2" sx={{ ml: 1 }}>
            {pr.author}
          </Typography>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle2" gutterBottom>
          Performance Metrics
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Compilation Time
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {pr.metrics.compilationTime}s
            </Typography>
          </Grid>
          
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Memory Usage
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {pr.metrics.memoryUsage} MB
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ mt: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2">
                  Tests Passed
                </Typography>
                <Typography variant="body2">
                  {pr.metrics.testsPassed}/{pr.metrics.testsTotal}
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={testPassRate} 
                color={testPassRate === 100 ? "success" : "primary"}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PRCard; 