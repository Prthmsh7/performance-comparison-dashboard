import React, { useState } from 'react';
import { 
  Grid, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Tabs,
  Tab,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import PRCard from '../components/PRCard';
import { prData } from '../data/dummyData';

type StatusFilter = 'all' | 'approved' | 'rejected' | 'pending';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`pr-tabpanel-${index}`}
      aria-labelledby={`pr-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const PullRequests: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [tabValue, setTabValue] = useState(0);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value as StatusFilter);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    event.stopPropagation();
  };

  // Filter PRs based on search term and status filter
  const filteredPRs = prData.filter(pr => {
    const matchesSearch = 
      pr.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pr.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pr.id.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || pr.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Group PRs by status for tabs
  const approvedPRs = prData.filter(pr => pr.status === 'approved');
  const pendingPRs = prData.filter(pr => pr.status === 'pending');
  const rejectedPRs = prData.filter(pr => pr.status === 'rejected');

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Pull Requests
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Overview of pull requests and their performance impact.
        </Typography>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search PRs by title, author, or ID..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="status-filter-label">Status</InputLabel>
                <Select
                  labelId="status-filter-label"
                  id="status-filter"
                  value={statusFilter}
                  label="Status"
                  onChange={handleStatusFilterChange}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="PR tabs"
          variant="fullWidth"
        >
          <Tab label={`All (${prData.length})`} />
          <Tab label={`Approved (${approvedPRs.length})`} />
          <Tab label={`Pending (${pendingPRs.length})`} />
          <Tab label={`Rejected (${rejectedPRs.length})`} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {filteredPRs.map((pr) => (
            <Grid item xs={12} sm={6} md={4} key={pr.id}>
              <PRCard pr={pr} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          {approvedPRs
            .filter(pr => pr.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         pr.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pr.id.toString().includes(searchTerm))
            .map((pr) => (
              <Grid item xs={12} sm={6} md={4} key={pr.id}>
                <PRCard pr={pr} />
              </Grid>
            ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          {pendingPRs
            .filter(pr => pr.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         pr.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pr.id.toString().includes(searchTerm))
            .map((pr) => (
              <Grid item xs={12} sm={6} md={4} key={pr.id}>
                <PRCard pr={pr} />
              </Grid>
            ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          {rejectedPRs
            .filter(pr => pr.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         pr.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pr.id.toString().includes(searchTerm))
            .map((pr) => (
              <Grid item xs={12} sm={6} md={4} key={pr.id}>
                <PRCard pr={pr} />
              </Grid>
            ))}
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default PullRequests; 