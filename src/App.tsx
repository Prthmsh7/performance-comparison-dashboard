import { useMemo, useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, PaletteMode } from '@mui/material';
import { getTheme } from './theme';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Trends from './pages/Trends';
import Comparison from './pages/Comparison';
import Tests from './pages/Tests';
import PullRequests from './pages/PullRequests';

/**
 * Main App component that sets up routing and theming.
 * Handles color mode (light/dark) state and provides the theme to all child components.
 */
function App() {
  // State for managing light/dark mode
  const [mode, setMode] = useState<PaletteMode>('light');

  // Toggle between light and dark mode
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Generate theme based on current mode
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline normalizes styles across browsers */}
      <CssBaseline />
      <Router>
        <MainLayout toggleColorMode={toggleColorMode} mode={mode}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/comparison" element={<Comparison />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/pull-requests" element={<PullRequests />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
