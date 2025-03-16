export interface CompilerMetric {
  name: string;
  before: number;
  after: number;
  unit: string;
}

export interface CompilerTest {
  id: string;
  name: string;
  status: 'improved' | 'regressed' | 'unchanged';
  beforeTime: number;
  afterTime: number;
  difference: number;
  percentChange: number;
}

export interface TimeSeriesData {
  date: string;
  compilationTime: number;
  memoryUsage: number;
  cpuUsage: number;
}

export interface PRData {
  id: number;
  title: string;
  author: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  metrics: {
    compilationTime: number;
    memoryUsage: number;
    testsPassed: number;
    testsTotal: number;
  };
}

// Dummy data for compiler metrics
export const compilerMetrics: CompilerMetric[] = [
  { name: 'Compilation Time', before: 45.2, after: 38.7, unit: 'seconds' },
  { name: 'Memory Usage', before: 1250, after: 1180, unit: 'MB' },
  { name: 'CPU Usage', before: 78, after: 65, unit: '%' },
  { name: 'Binary Size', before: 24.5, after: 23.8, unit: 'MB' },
  { name: 'Startup Time', before: 1.8, after: 1.5, unit: 'seconds' },
  { name: 'Cache Hit Rate', before: 75, after: 82, unit: '%' },
];

// Dummy data for compiler tests
export const compilerTests: CompilerTest[] = [
  {
    id: 'test-1',
    name: 'Parser Performance',
    status: 'improved',
    beforeTime: 12.5,
    afterTime: 10.2,
    difference: -2.3,
    percentChange: -18.4,
  },
  {
    id: 'test-2',
    name: 'Type Checking',
    status: 'improved',
    beforeTime: 18.3,
    afterTime: 15.7,
    difference: -2.6,
    percentChange: -14.2,
  },
  {
    id: 'test-3',
    name: 'Code Generation',
    status: 'regressed',
    beforeTime: 8.7,
    afterTime: 9.5,
    difference: 0.8,
    percentChange: 9.2,
  },
  {
    id: 'test-4',
    name: 'Optimization Pass',
    status: 'unchanged',
    beforeTime: 15.1,
    afterTime: 15.0,
    difference: -0.1,
    percentChange: -0.7,
  },
  {
    id: 'test-5',
    name: 'Linking',
    status: 'improved',
    beforeTime: 5.8,
    afterTime: 4.9,
    difference: -0.9,
    percentChange: -15.5,
  },
];

// Dummy time series data for historical performance
export const timeSeriesData: TimeSeriesData[] = [
  { date: '2023-01-01', compilationTime: 52, memoryUsage: 1350, cpuUsage: 82 },
  { date: '2023-02-01', compilationTime: 50, memoryUsage: 1320, cpuUsage: 80 },
  { date: '2023-03-01', compilationTime: 48, memoryUsage: 1300, cpuUsage: 79 },
  { date: '2023-04-01', compilationTime: 49, memoryUsage: 1310, cpuUsage: 78 },
  { date: '2023-05-01', compilationTime: 47, memoryUsage: 1290, cpuUsage: 76 },
  { date: '2023-06-01', compilationTime: 45, memoryUsage: 1270, cpuUsage: 75 },
  { date: '2023-07-01', compilationTime: 44, memoryUsage: 1260, cpuUsage: 74 },
  { date: '2023-08-01', compilationTime: 43, memoryUsage: 1250, cpuUsage: 73 },
  { date: '2023-09-01', compilationTime: 42, memoryUsage: 1240, cpuUsage: 72 },
  { date: '2023-10-01', compilationTime: 41, memoryUsage: 1230, cpuUsage: 71 },
  { date: '2023-11-01', compilationTime: 40, memoryUsage: 1220, cpuUsage: 70 },
  { date: '2023-12-01', compilationTime: 39, memoryUsage: 1200, cpuUsage: 68 },
  { date: '2024-01-01', compilationTime: 38, memoryUsage: 1180, cpuUsage: 65 },
];

// Dummy PR data
export const prData: PRData[] = [
  {
    id: 1001,
    title: 'Optimize parser for better performance',
    author: 'dev_alice',
    date: '2024-01-15',
    status: 'approved',
    metrics: {
      compilationTime: 38.7,
      memoryUsage: 1180,
      testsPassed: 245,
      testsTotal: 250,
    },
  },
  {
    id: 1002,
    title: 'Improve type checking algorithm',
    author: 'dev_bob',
    date: '2024-01-22',
    status: 'pending',
    metrics: {
      compilationTime: 39.2,
      memoryUsage: 1190,
      testsPassed: 248,
      testsTotal: 250,
    },
  },
  {
    id: 1003,
    title: 'Reduce memory usage in code generation',
    author: 'dev_charlie',
    date: '2024-01-28',
    status: 'approved',
    metrics: {
      compilationTime: 38.5,
      memoryUsage: 1150,
      testsPassed: 250,
      testsTotal: 250,
    },
  },
  {
    id: 1004,
    title: 'Fix regression in optimization pass',
    author: 'dev_diana',
    date: '2024-02-05',
    status: 'rejected',
    metrics: {
      compilationTime: 40.1,
      memoryUsage: 1210,
      testsPassed: 242,
      testsTotal: 250,
    },
  },
  {
    id: 1005,
    title: 'Implement parallel compilation for certain modules',
    author: 'dev_eric',
    date: '2024-02-12',
    status: 'approved',
    metrics: {
      compilationTime: 35.8,
      memoryUsage: 1220,
      testsPassed: 249,
      testsTotal: 250,
    },
  },
]; 