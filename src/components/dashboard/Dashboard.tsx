import React, { useEffect, useState, useContext } from 'react';
import { Card, Typography, Box, Grid } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/api';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardData {
  totalClients: number;
  totalProjects: number;
  activeProjects: number;
  totalRevenue: number;
  monthlyStats: {
    labels: string[];
    data: number[];
  };
}

const Dashboard: React.FC = () => {
  const { token } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  const chartData = {
    labels: dashboardData?.monthlyStats?.labels || [],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: dashboardData?.monthlyStats?.data || [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Revenue Trend',
      },
    },
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Typography variant="h5" color="text.secondary">
          Loading dashboard data...
        </Typography>
      </Box>
    );
  }

  if (!dashboardData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Typography variant="h5" color="text.secondary">
          Unable to load dashboard data
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 10 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 6 }}>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" color="text.secondary">
              Total Clients
            </Typography>
            <Typography variant="h4">
              {dashboardData?.totalClients || 0}
            </Typography>
          </Card>
        </Grid>
        
        <Grid xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" color="text.secondary">
              Total Projects
            </Typography>
            <Typography variant="h4">
              {dashboardData?.totalProjects || 0}
            </Typography>
          </Card>
        </Grid>
        
        <Grid xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" color="text.secondary">
              Active Projects
            </Typography>
            <Typography variant="h4">
              {dashboardData?.activeProjects || 0}
            </Typography>
          </Card>
        </Grid>
        
        <Grid xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" color="text.secondary">
              Total Revenue
            </Typography>
            <Typography variant="h4">
              ${dashboardData?.totalRevenue || 0}
            </Typography>
          </Card>
        </Grid>

        {/* Chart */}
        <Grid xs={12}>
          <Card sx={{ p: 2 }}>
            <Line data={chartData} options={chartOptions} />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 