import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  Typography,
  LinearProgress,
  Card,
  CardContent,
} from '@mui/material';
import {
  ArrowUpward,
  ArrowDownward,
  Remove,
} from '@mui/icons-material';
import { CompilerTest } from '../data/dummyData';

interface TestResultsTableProps {
  tests: CompilerTest[];
}

const TestResultsTable: React.FC<TestResultsTableProps> = ({ tests }) => {
  // Calculate summary statistics
  const improved = tests.filter(test => test.status === 'improved').length;
  const regressed = tests.filter(test => test.status === 'regressed').length;
  const unchanged = tests.filter(test => test.status === 'unchanged').length;
  const total = tests.length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'improved':
        return <ArrowDownward fontSize="small" sx={{ color: 'success.main' }} />;
      case 'regressed':
        return <ArrowUpward fontSize="small" sx={{ color: 'error.main' }} />;
      case 'unchanged':
        return <Remove fontSize="small" sx={{ color: 'text.secondary' }} />;
      default:
        return null;
    }
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'improved':
        return (
          <Chip 
            label="Improved" 
            size="small" 
            color="success" 
            sx={{ fontWeight: 'bold' }} 
          />
        );
      case 'regressed':
        return (
          <Chip 
            label="Regressed" 
            size="small" 
            color="error" 
            sx={{ fontWeight: 'bold' }} 
          />
        );
      case 'unchanged':
        return (
          <Chip 
            label="Unchanged" 
            size="small" 
            color="default" 
            sx={{ fontWeight: 'bold' }} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Test Results
        </Typography>
        
        <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ minWidth: 120 }}>
            <Typography variant="body2" color="text.secondary">
              Improved
            </Typography>
            <Typography variant="h5" sx={{ color: 'success.main', fontWeight: 'bold' }}>
              {improved}
            </Typography>
          </Box>
          
          <Box sx={{ minWidth: 120 }}>
            <Typography variant="body2" color="text.secondary">
              Regressed
            </Typography>
            <Typography variant="h5" sx={{ color: 'error.main', fontWeight: 'bold' }}>
              {regressed}
            </Typography>
          </Box>
          
          <Box sx={{ minWidth: 120 }}>
            <Typography variant="body2" color="text.secondary">
              Unchanged
            </Typography>
            <Typography variant="h5" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
              {unchanged}
            </Typography>
          </Box>
          
          <Box sx={{ minWidth: 120 }}>
            <Typography variant="body2" color="text.secondary">
              Total Tests
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {total}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2">
              Improved: {improved} ({((improved / total) * 100).toFixed(1)}%)
            </Typography>
            <Typography variant="body2">
              {improved}/{total}
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={(improved / total) * 100} 
            color="success"
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
        
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table sx={{ minWidth: 650 }} aria-label="test results table">
            <TableHead>
              <TableRow>
                <TableCell>Test Name</TableCell>
                <TableCell align="right">Before (s)</TableCell>
                <TableCell align="right">After (s)</TableCell>
                <TableCell align="right">Difference (s)</TableCell>
                <TableCell align="right">Change (%)</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tests.map((test) => (
                <TableRow
                  key={test.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {getStatusIcon(test.status)}
                      <Typography sx={{ ml: 1 }}>
                        {test.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">{test.beforeTime.toFixed(2)}</TableCell>
                  <TableCell align="right">{test.afterTime.toFixed(2)}</TableCell>
                  <TableCell 
                    align="right"
                    sx={{ 
                      color: test.difference < 0 
                        ? 'success.main' 
                        : test.difference > 0 
                          ? 'error.main' 
                          : 'text.secondary',
                      fontWeight: 'bold'
                    }}
                  >
                    {test.difference > 0 ? '+' : ''}{test.difference.toFixed(2)}
                  </TableCell>
                  <TableCell 
                    align="right"
                    sx={{ 
                      color: test.percentChange < 0 
                        ? 'success.main' 
                        : test.percentChange > 0 
                          ? 'error.main' 
                          : 'text.secondary',
                      fontWeight: 'bold'
                    }}
                  >
                    {test.percentChange > 0 ? '+' : ''}{test.percentChange.toFixed(1)}%
                  </TableCell>
                  <TableCell align="center">
                    {getStatusChip(test.status)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default TestResultsTable; 