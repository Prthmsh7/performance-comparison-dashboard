import React, { useState } from 'react';
import { 
  Grid, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  SelectChangeEvent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme
} from '@mui/material';
import ComparisonChart from '../components/ComparisonChart';
import { compilerMetrics } from '../data/dummyData';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Comparison: React.FC = () => {
  const theme = useTheme();
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    'Compilation Time',
    'Memory Usage',
    'CPU Usage',
  ]);

  const handleMetricsChange = (event: SelectChangeEvent<typeof selectedMetrics>) => {
    const {
      target: { value },
    } = event;
    setSelectedMetrics(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  // Filter metrics based on selection
  const filteredMetrics = compilerMetrics.filter(metric => 
    selectedMetrics.includes(metric.name)
  );

  // Prepare data for radar chart
  const radarData = compilerMetrics.map(metric => {
    const normalizeValue = (value: number, metricName: string) => {
      if (metricName.includes('Time') || metricName.includes('Usage') || metricName.includes('Size')) {
        const max = Math.max(metric.before, metric.after) * 1.2;
        return 100 - ((value / max) * 100);
      } else {
        const max = Math.max(metric.before, metric.after) * 1.2;
        return (value / max) * 100;
      }
    };

    return {
      metric: metric.name,
      before: normalizeValue(metric.before, metric.name),
      after: normalizeValue(metric.after, metric.name),
      beforeRaw: metric.before,
      afterRaw: metric.after,
      unit: metric.unit,
    };
  });

  const calculateOverallImprovement = () => {
    let totalImprovement = 0;
    
    compilerMetrics.forEach(metric => {
      const percentChange = ((metric.after - metric.before) / metric.before) * 100;
      
      if (metric.name.includes('Time') || metric.name.includes('Usage') || metric.name.includes('Size')) {
        totalImprovement -= percentChange;
      } else {
        totalImprovement += percentChange;
      }
    });
    
    return (totalImprovement / compilerMetrics.length).toFixed(2);
  };

  const overallImprovement = calculateOverallImprovement();

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          PR Comparison
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Detailed comparison of compiler performance before and after changes.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Performance Metrics Comparison
                </Typography>
                <FormControl sx={{ minWidth: 200 }} size="small">
                  <InputLabel id="metrics-select-label">Metrics</InputLabel>
                  <Select
                    labelId="metrics-select-label"
                    id="metrics-select"
                    multiple
                    value={selectedMetrics}
                    onChange={handleMetricsChange}
                    label="Metrics"
                    renderValue={(selected) => selected.join(', ')}
                    sx={{
                      '& .MuiSelect-select': {
                        backgroundColor: theme.palette.background.paper,
                      }
                    }}
                  >
                    {compilerMetrics.map((metric) => (
                      <MenuItem key={metric.name} value={metric.name}>
                        {metric.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <ComparisonChart 
                title="" 
                metrics={filteredMetrics} 
                height={350}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ 
            height: '100%',
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.background.paper
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Overall Performance
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'center',
                height: '80%',
              }}>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontWeight: 'bold', 
                    color: parseFloat(overallImprovement) > 0 
                      ? theme.palette.success.main 
                      : theme.palette.error.main,
                    mb: 1,
                  }}
                >
                  {parseFloat(overallImprovement) > 0 ? '+' : ''}{overallImprovement}%
                </Typography>
                <Typography variant="body1" color="text.secondary" align="center">
                  Overall performance improvement across all metrics
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ backgroundColor: theme.palette.background.paper }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Radar
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Higher values on the radar indicate better performance. For metrics where lower values are better (like compilation time), the scale is inverted.
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke={theme.palette.text.secondary} />
                  <PolarAngleAxis 
                    tick={{ fill: theme.palette.text.primary }} 
                    dataKey="metric" 
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]} 
                    tick={{ fill: theme.palette.text.secondary }}
                  />
                  <Radar
                    name="Before"
                    dataKey="before"
                    stroke={theme.palette.primary.main}
                    fill={theme.palette.primary.main}
                    fillOpacity={0.2}
                  />
                  <Radar
                    name="After"
                    dataKey="after"
                    stroke={theme.palette.secondary.main}
                    fill={theme.palette.secondary.main}
                    fillOpacity={0.2}
                  />
                  <Legend 
                    wrapperStyle={{
                      color: theme.palette.text.primary
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Detailed Metrics
              </Typography>
              <TableContainer 
                component={Paper} 
                sx={{ 
                  boxShadow: theme.shadows[1],
                  backgroundColor: theme.palette.background.paper
                }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="metrics table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: theme.palette.text.primary }}>Metric</TableCell>
                      <TableCell align="right" sx={{ color: theme.palette.text.primary }}>Before</TableCell>
                      <TableCell align="right" sx={{ color: theme.palette.text.primary }}>After</TableCell>
                      <TableCell align="right" sx={{ color: theme.palette.text.primary }}>Difference</TableCell>
                      <TableCell align="right" sx={{ color: theme.palette.text.primary }}>Change (%)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {compilerMetrics.map((metric) => {
                      const difference = metric.after - metric.before;
                      const percentChange = (difference / metric.before) * 100;
                      const isImproved = 
                        (metric.name.includes('Time') || metric.name.includes('Usage') || metric.name.includes('Size')) 
                          ? percentChange < 0 
                          : percentChange > 0;
                      
                      return (
                        <TableRow
                          key={metric.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row" sx={{ color: theme.palette.text.primary }}>
                            {metric.name}
                          </TableCell>
                          <TableCell align="right" sx={{ color: theme.palette.text.primary }}>
                            {metric.before} {metric.unit}
                          </TableCell>
                          <TableCell align="right" sx={{ color: theme.palette.text.primary }}>
                            {metric.after} {metric.unit}
                          </TableCell>
                          <TableCell 
                            align="right"
                            sx={{ 
                              color: isImproved 
                                ? theme.palette.success.main 
                                : theme.palette.error.main,
                              fontWeight: 'bold'
                            }}
                          >
                            {difference > 0 ? '+' : ''}{difference.toFixed(2)} {metric.unit}
                          </TableCell>
                          <TableCell 
                            align="right"
                            sx={{ 
                              color: isImproved 
                                ? theme.palette.success.main 
                                : theme.palette.error.main,
                              fontWeight: 'bold'
                            }}
                          >
                            {percentChange > 0 ? '+' : ''}{percentChange.toFixed(2)}%
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Comparison;