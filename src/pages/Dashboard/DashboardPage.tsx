import React, { useState, useEffect } from 'react';
import ResponsiveGrid from '../../components/Layout/ResponsiveGrid';
import KpiCard from '../../components/KpiCard/KpiCard';
import KpiCardSkeleton from '../../components/KpiCard/KpiCardSkeleton';
import type { KpiCardModel } from '../../models/KpiCardModel';
import { RefreshCw } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  // Simulated KPI Data
  const kpiData: KpiCardModel[] = [
    {
      id: 'headcount',
      title: 'Total Headcount',
      value: '1,482',
      changePercentage: '+4.2%',
      changeDirection: 'up',
      timeframe: 'vs last month',
      iconName: 'Users',
      colorTheme: '#6366f1', // Indigo
    },
    {
      id: 'active-roles',
      title: 'Active Roles',
      value: '84',
      changePercentage: '+12.5%',
      changeDirection: 'up',
      timeframe: 'vs last month',
      iconName: 'Activity',
      colorTheme: '#10b981', // Emerald
    },
    {
      id: 'turnover',
      title: 'Turnover Rate',
      value: '1.8%',
      changePercentage: '-0.4%',
      changeDirection: 'down',
      timeframe: 'vs last quarter',
      iconName: 'UserMinus',
      colorTheme: '#ef4444', // Red
    },
    {
      id: 'tenure',
      title: 'Avg. Tenure',
      value: '3.6 Yrs',
      changePercentage: '0.0%',
      changeDirection: 'neutral',
      timeframe: 'vs last year',
      iconName: 'Clock',
      colorTheme: '#f59e0b', // Amber
    },
  ];

  // Simulating initial fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', justifyContent: 'center', minHeight: '70vh', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      {/* Page Header */}
      <div className="page-header" style={{ justifyContent: 'center', textAlign: 'center', flexDirection: 'column', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div>
          <h1 className="page-title">Workforce Analytics</h1>
          <p className="page-subtitle">Real-time metrics and overall workforce health indicators.</p>
        </div>
        <button 
          className="icon-button" 
          onClick={handleRefresh} 
          disabled={loading}
          title="Refresh metrics" 
          style={{ border: '1px solid var(--border-color)', opacity: loading ? 0.7 : 1 }}
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* KPI Cards Grid */}
      <ResponsiveGrid columns={{ mobile: 1, tablet: 2, desktop: 4 }}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <KpiCardSkeleton key={i} />)
          : kpiData.map((kpi) => <KpiCard key={kpi.id} data={kpi} />)}
      </ResponsiveGrid>

      {/* Demo Controls Bar */}
      <div className="demo-bar" style={{ justifyContent: 'center' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Demo Controls:</span>
        <button className="demo-btn" onClick={() => setLoading((prev) => !prev)}>
          Toggle Loading State
        </button>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          (Demonstrates responsive skeletons & micro-animations)
        </span>
      </div>
    </div>
  );
};

export default DashboardPage;
